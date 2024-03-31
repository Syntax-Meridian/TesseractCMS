import express, {Router, Request, Response, NextFunction} from 'express';
import next from 'next';
import {PagesService, PagesServiceContract,} from './domains/pages/pages.service';
import {AuthServiceContract, DummyAuthService,} from './shared/auth/auth.service';
import {MediaService, MediaServiceContract,} from './domains/media/media.service';
import {PagesController} from './domains/pages/pages.controller';
import {MediaController} from './domains/media/media.controller';
import { TesseractPrismaDB } from './domains/pages/tesseract.prismadb';
import MyLogger from './domains/middleware/logger';

// TODO: Migrate env vars to application.config.ts
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({dev});
const handle = app.getRequestHandler();

(async () => {
    try {
        await app.prepare();
        const server = express();

        // middleware and it should be before the routes
        server.use(express.json())
        server.use(express.urlencoded({ extended: true }))
        server.use(MyLogger)

        const router = buildRoutes();
        server.use(router);
        server.listen(port, (err?: unknown) => {
            if (err) throw err;
            console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
        });
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
})();

function buildRoutes(): Router {
    const router = Router();

    const tessPrismaDB = new TesseractPrismaDB();
    const authService: AuthServiceContract = new DummyAuthService();
    const pagesService: PagesServiceContract = new PagesService(tessPrismaDB);
    const mediaService: MediaServiceContract = new MediaService();

    // Wire up controllers
    new PagesController(authService, pagesService).addRoutes(router);
    new MediaController(authService, mediaService).addRoutes(router);

    // Reject all requests that go to API but don't go to a defined route
    router.all('/api/*', (_req: Request, res: Response) => {
        res.status(401)
            .send('Unauthorized');
    })

    // Fallback route (also serves as Next.js web server)
    router.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
        const statusCode = res.statusCode === 200 ? 500 : res.statusCode
        const message = err.message

        res.status(statusCode).json({
            message,
            stack: process.env.NODE_ENV === 'development' ? "🥞" : err.stack
        })
    })

    return router;
}

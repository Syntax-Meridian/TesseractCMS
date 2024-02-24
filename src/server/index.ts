import express, {Router, Request, Response} from 'express';
import next from 'next';
import {PagesService, PagesServiceContract,} from './domains/pages/pages.service';
import {AuthServiceContract, DummyAuthService,} from './shared/auth/auth.service';
import {MediaService, MediaServiceContract,} from './domains/media/media.service';
import {PagesController} from './domains/pages/pages.controller';
import {MediaController} from './domains/media/media.controller';

// TODO: Migrate env vars to application.config.ts
const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

const app = next({dev});
const handle = app.getRequestHandler();

(async () => {
    try {
        await app.prepare();
        const server = express();
        const router = buildRoutes();
        server.use(router);
        server.listen(port, (err?: any) => {
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

    const authService: AuthServiceContract = new DummyAuthService();
    const pagesService: PagesServiceContract = new PagesService();
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

    return router;
}

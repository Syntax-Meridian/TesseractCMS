// Route definitions go in controller classes, as well as any
// transformations of Express Request/Response <-> service Request/Response classes

import {Request, Response, Router} from 'express';
import {PagesServiceContract} from './pages.service';
import {AuthServiceContract} from 'src/server/shared/auth/auth.service';

export class PagesController {
  readonly authService: AuthServiceContract;
  readonly pagesService: PagesServiceContract;

  constructor(
    authService: AuthServiceContract,
    pagesService: PagesServiceContract,
  ) {
    this.authService = authService;
    this.pagesService = pagesService;
  }

  addRoutes(router: Router) {
    router.post("/api/pages", (req: Request, res: Response) => this.createPageRoute(req, res));
    router.get("/api/pages", (req: Request, res:Response) => this.getAllPPagesRoute(req, res))
    router.get("/api/pages/:id", (req: Request, res: Response) => this.getPageByIdRoute(req, res))
    router.get("/api/pages/:slug", (req: Request, res: Response) => this.getPageBySlugRoute(req, res))
    router.delete("/api/pages/:id", (req: Request, res: Response) => this.deletePageRoute(req, res))
    // TODO: other routes
  }

 async getPageByIdRoute(req: Request, res: Response) {
    try {
        const pageResponse = await this.pagesService.getPageById(+req.params.id)

        return res.json({
            success: true,
            data: pageResponse
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                success: false,
                messsage: err.message,
                stack: err.stack,
            })
        }
    }
 }

  async getPageBySlugRoute(req: Request, res: Response) {
    try {
        const pageResponse = await this.pagesService.getPageBySlug(req.params.slug)

        return res.json({
            success: true,
            data: pageResponse
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                success: false,
                message: err.message,
                stack: err.stack,
            })
        }
    }
  }

  async createPageRoute(req: Request, res: Response) {
    try {
        // const rawBody = createPageReqValidator(req.body);

        const pageResponse = await this.pagesService.createPage(req.body)

        return res.status(201).json({
            success: true,
            data: pageResponse
        })
    } catch (err) {console.log(67);

        if (err instanceof Error) {
            res.status(400).json({
                success: false,
                message: err.message,
                stack: err.stack,
            })
        }
    }
  }

  async updatePageRoute(_req: Request, _res: Response) {
    // TODO: call pages service
  }

  async deletePageRoute(req: Request, res: Response) {
    try {
        const deletedPage = await this.pagesService.deletePage(+req.params.id)

        return res.json({
            success: true,
            deletedPage
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(404).json({
                success: false,
                message: err.message,
                stack: err.stack,
            })
        }
    }
  }

  async getAllPPagesRoute(_req: Request, res: Response) {
    try {
        const pages =  await this.pagesService.getAllPages()

        return res.json({
            success: true,
            data: pages
        })
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({
                success: false,
                message: err.message,
                stack: err.stack,
            })
        }
    }
  }
}

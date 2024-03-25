// Route definitions go in controller classes, as well as any
// transformations of Express Request/Response <-> service Request/Response classes

import {Request, Response, Router} from 'express';
import {PagesServiceContract} from './pages.service';
import {AuthServiceContract} from 'src/server/shared/auth/auth.service';
import { createPageValidate } from '../middleware/validation';

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
    router.post("/api/pages", createPageValidate, (req: Request, res: Response) => this.createPageRoute(req, res));
    router.get("/api/pages", (req: Request, res:Response) => this.getAllPPagesRoute(req, res))
    router.get("/api/pages/:slug", (req: Request, res: Response) => this.getPageBySlugRoute(req, res))
    router.get("/api/pages/:id", (req: Request, res: Response) => this.getPageByIdRoute(req, res))
    router.delete("/api/pages/:id", (req: Request, res: Response) => this.deletePageRoute(req, res))
    // TODO: other routes
  }

 async getPageByIdRoute(req: Request, res: Response) {
        const result = await this.pagesService.getPageById(+req.params.id)

        if (result.isOk()) {
            res.json({
                success: true,
                data: {
                    id: result.value.id,
                    slug: result.value.slug,
                    layoutType: result.value.layoutType,
                    contentData: result.value.contentData
                }
            })
        } else{
            res.status(404).json({
                success: true,
                message: result.error.message
            })
        }
 }

  async getPageBySlugRoute(req: Request, res: Response) {
    const result = await this.pagesService.getPageBySlug(req.params.slug)

    if (result.isOk()) {
        res.json({
            success: true,
            data: {
                id: result.value.id,
                slug: result.value.slug,
                layoutType: result.value.layoutType,
                contentData: result.value.contentData
            }
        })
    } else{
        res.status(404).json({
            success: true,
            message: result.error.message
        })
    }
  }

  async createPageRoute(req: Request, res: Response) {
    try {
        const pageResponse = await this.pagesService.createPage(req.body)

        return res.status(201).json({
            success: true,
            data: pageResponse
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

  async updatePageRoute(_req: Request, _res: Response) {
    // TODO: call pages service
  }

  async deletePageRoute(req: Request, res: Response) {
        const result = await this.pagesService.deletePage(+req.params.id)
console.log(99, 'hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')
        if (result.isOk()) {
            res.json({
                success: true,
                data: {}
            })
        } else{
            res.status(404).json({
                success: true,
                message: result.error.message
            })
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

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
    router.get("/api/pages/:slug", (req: Request, res: Response) => this.getPageBySlugRoute(req, res))
    router.get("/api/pages/:id", (req: Request, res: Response) => this.getPageByIdRoute(req, res))
    // TODO: other routes
  }

 async getPageByIdRoute(req: Request, res: Response) {
    const pageResponse = await this.pagesService.getPageById(+req.params.id)

    if(pageResponse === null) {
        return res.status(404).json({message: 'Page not found by id'});
    }

    return res.json(pageResponse)
 }

  async getPageBySlugRoute(req: Request, res: Response) {
    const pageResponse = await this.pagesService.getPageBySlug(req.params.slug)

    if(pageResponse === null) {
        return res.status(404).json({message: 'Page not found by slug'});
    }

    return res.json(pageResponse)
  }

  async createPageRoute(req: Request, res: Response) {
    // const rawBody = createPageReqValidator(req.body);

    // TODO: call pages service
    const pageResponse = await this.pagesService.createPage(req.body)

    return res.status(201).json(pageResponse)
    // throw new Error("Not implemented yet");
  }

  async updatePageRoute(_req: Request, _res: Response) {
    // TODO: call pages service
  }

  async deletePageRoute(_req: Request, _res: Response) {
    // TODO: call pages service
  }
}

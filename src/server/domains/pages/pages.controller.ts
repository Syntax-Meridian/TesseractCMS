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
    router.post("/api/pages", this.createPageRoute);
    // TODO: other routes
  }

  async getPageByIdRoute(_req: Request, _res: Response) {
    // TODO: call pages service
  }

  async getPageBySlugRoute(_req: Request, _res: Response) {
    // TODO: call pages service
  }

  async createPageRoute(_req: Request, _res: Response) {
    // const rawBody = createPageReqValidator(req.body);

    // TODO: call pages service
    throw new Error("Not implemented yet");
  }

  async updatePageRoute(_req: Request, _res: Response) {
    // TODO: call pages service
  }

  async deletePageRoute(_req: Request, _res: Response) {
    // TODO: call pages service
  }
}

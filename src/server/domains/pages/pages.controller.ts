// Route definitions go in controller classes, as well as any 
// transformations of Express Request/Response <-> service Request/Response classes

import {Request, Response, Router} from 'express';
import { PagesServiceContract } from './pages.service';
import { AuthServiceContract } from 'src/server/shared/auth/auth.service';

export class PagesController {
  readonly authService: AuthServiceContract;
  readonly pagesService: PagesServiceContract;

  constructor(authService: AuthServiceContract, pagesService: PagesServiceContract) {
    this.authService = authService;
    this.pagesService = pagesService;
  }

  addRoutes(router: Router) {
    router.post('/pages', this.createPageRoute);
    // TODO: other routes
  }

  async getPageByIdRoute(req: Request, res: Response) {
    // TODO: call pages service
  }

  async getPageBySlugRoute(req: Request, res: Response) {
    // TODO: call pages service
  }

  async createPageRoute(req: Request, res: Response) {
    // TODO: call pages service
  }

  async updatePageRoute(req: Request, res: Response) {
    // TODO: call pages service
  }

  async deletePageRoute(req: Request, res: Response) {
    // TODO: call pages service
  }
}

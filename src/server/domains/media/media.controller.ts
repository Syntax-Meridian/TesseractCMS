// Route definitions go in controller classes.
import {Request, Response, Router} from 'express';
import {MediaServiceContract} from './media.service';
import {AuthServiceContract} from 'src/server/shared/auth/auth.service';

export class MediaController {
  readonly authService: AuthServiceContract;
  readonly mediaService: MediaServiceContract;

  constructor(
    authService: AuthServiceContract,
    mediaService: MediaServiceContract,
  ) {
    this.authService = authService;
    this.mediaService = mediaService;
  }

  addRoutes(router: Router) {
    router.post("/media", this.uploadMedia);
    // TODO: other routes
  }

  async uploadMedia(_req: Request, _res: Response) {
    // TODO: call media service
  }
}

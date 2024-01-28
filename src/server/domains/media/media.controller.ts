// Route definitions go in controller classes.
import {Request, Response, Router} from 'express';
import { MediaService, MediaServiceContract } from './media.service';
import { AuthServiceContract, DummyAuthService } from 'src/server/shared/auth/auth.service';

export class MediaController {
  readonly authService: AuthServiceContract;
  readonly mediaService: MediaServiceContract;

  constructor(authService: AuthServiceContract, mediaService: MediaServiceContract) {
    this.authService = authService;
    this.mediaService = mediaService;
  }

  addRoutes(router: Router) {
    router.post('/media', this.uploadMedia);
    // TODO: other routes
  }

  async uploadMedia(req: Request, res: Response) {
    // TODO: call media service
  }
}

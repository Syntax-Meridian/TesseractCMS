// Business logic in service files.

import { CmsMedia } from "./dto/CmsMedia.class";

// TODO: These req/resp classes could be moved to a subfolder,
// but for simplicity's sake they're here for now.
export interface UploadMediaRequest {
  // TODO
}

export interface UploadMediaResult {
  // TODO
}

export interface MediaServiceContract {
  uploadMedia(req: UploadMediaRequest): Promise<UploadMediaResult>;
  getMediaById(id: string): Promise<CmsMedia | null>;
}

export class MediaService implements MediaServiceContract {
   async uploadMedia(_req: UploadMediaRequest): Promise<UploadMediaResult> {
        throw new Error("Method not implemented.");
    }
   async getMediaById(_id: string): Promise<CmsMedia | null> {
        throw new Error("Method not implemented.");
    }
}

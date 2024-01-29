// Business logic in service files.

import { CmsPage } from "./dto/CmsPage.class";

// TODO: These req/resp classes could be moved to a subfolder,
// but for simplicity's sake they're here for now.
export interface CreateCmsPageRequest {
  // TODO
}

export interface UpdateCmsPageRequest {
  // TODO
}

export interface CreatePageResult {
  // TODO
}

export interface UpdatePageResult {
  // TODO
}

export interface DeletePageResult {
  // TODO
}

export interface PagesServiceContract {
  getPageById(id: string): Promise<CmsPage>;
  getPageBySlug(slug: string): Promise<CmsPage>;
  createPage(req: CreateCmsPageRequest): Promise<CreatePageResult>;
  updatePage(req: UpdateCmsPageRequest): Promise<UpdatePageResult>;
  deletePage(id: string): Promise<DeletePageResult>;
}

export class PagesService implements PagesServiceContract {
  // TODO
}

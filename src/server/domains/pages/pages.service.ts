// Business logic in service files.

import { PagesDBContract } from 'src/server/domains/pages/tesseract.prismadb';
import {CmsPage} from './dto/CmsPage.class';

// TODO: These req/resp classes could be moved to a subfolder,
// but for simplicity's sake they're here for now.
export interface CreateCmsPageRequest {
    slug: string,
    layoutType: string,
    contentData: {
       leftData: string,
       rightData: string,
    },
    published: boolean
}

export interface UpdateCmsPageRequest {
    // TODO
}

export interface CreatePageResult {
    id: number
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

    readonly prismaORM: PagesDBContract

    constructor(prismaDB: any) {
        this.prismaORM = prismaDB
    }

    async getPageById(_id: string): Promise<CmsPage> {
        throw new Error('Method not implemented.');
    }

    async getPageBySlug(_slug: string): Promise<CmsPage> {
        throw new Error('Method not implemented.');
    }

    async createPage(req: CreateCmsPageRequest): Promise<CreatePageResult> {

        // call database class
        try {
            const res = await this.prismaORM.savePage({
                slug: req.slug,
                layoutType: req.layoutType,
                contentData: JSON.stringify(req.contentData),
                published: req.published
            })

            return {
                id: res
            }
        } catch (err) {
            console.log(err)
            throw new Error('Method not implemented.');
        }
    }

    async updatePage(_req: UpdateCmsPageRequest): Promise<UpdatePageResult> {
        throw new Error('Method not implemented.');
    }

    async deletePage(_id: string): Promise<DeletePageResult> {
        throw new Error('Method not implemented.');
    }
}

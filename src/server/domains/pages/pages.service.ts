// Business logic in service files.

import { PagesDBContract } from 'src/server/domains/pages/tesseract.prismadb';
import { CmsPage } from './dto/CmsPage.class';
import { Result, Err, Ok  } from 'ts-results-es';

// TODO: These req/resp classes could be moved to a subfolder,
// but for simplicity's sake they're here for now.
export interface CreateCmsPageRequest {
    slug: string,
    layoutType: string,
    contentData: ContentData,
    published: boolean
}

export type ContentData = {
    leftData: string
    rightData: string
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

export interface DeletePageResult extends CreatePageResult {

}

export interface PagesServiceContract {
    getPageById(id: number): Promise<Result<CmsPage, Error>>;

    getPageBySlug(slug: string): Promise<Result<CmsPage, Error>>;

    createPage(req: CreateCmsPageRequest): Promise<CreatePageResult | Error>;

    updatePage(req: UpdateCmsPageRequest): Promise<UpdatePageResult>;

    deletePage(id: number): Promise<Result<void, Error>>;

    getAllPages(): Promise<CmsPage[]>
}

export class PagesService implements PagesServiceContract {

    readonly prismaORM: PagesDBContract

    constructor(prismaDB: PagesDBContract) {
        this.prismaORM = prismaDB
    }

    async getPageById(id: number): Promise<Result<CmsPage, Error>> {
        const res = await this.prismaORM.getPageById(id)

        if (res === null) {
            return Err(new Error(`Page not found by id: ${id}`))
        }

        return Ok({
            id: res.id,
            slug: res.slug,
            layoutType: res.layoutType,
            contentData: res.contentData,
            published: res.published,
            createdAt: res.createdAt,
            updatedAt: res.updatedAt,
        })
    }

    async getPageBySlug(slug: string): Promise<Result<CmsPage, Error>> {
        const res = await this.prismaORM.getPageBySlug(slug)

        if (res === null) {
            return Err(new Error(`Page not found by slug: ${slug}`))
        }

        return Ok({
                id: res.id,
                slug: res.slug,
                layoutType: res.layoutType,
                contentData: res.contentData,
                published: res.published,
                createdAt: res.createdAt,
                updatedAt: res.updatedAt,
        })
    }

    async createPage(req: CreateCmsPageRequest): Promise<CreatePageResult | Error> {
console.log('createPage: 96');

        // check if data already exists in db
        const page = await this.prismaORM.findIfPageExits({ slug: req.slug, layoutType: req.layoutType })

        if (page !== null ) {
            throw new Error('Page already exist')
        } else {
            const pageId = await this.prismaORM.savePage({
                slug: req.slug,
                layoutType: req.layoutType,
                contentData: JSON.stringify(req.contentData),
                published: req.published
            })

            return { id: pageId }
        }
    }

    async updatePage(_req: UpdateCmsPageRequest): Promise<UpdatePageResult> {
        throw new Error('Method not implemented.');
    }

    async deletePage(id: number): Promise<Result<void, Error>> {
        await this.prismaORM.deletePageById(id)

        return Ok.EMPTY
    }

    async getAllPages(): Promise<CmsPage[]> {
        return await this.prismaORM.getAllPages()
    }
}

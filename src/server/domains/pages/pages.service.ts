// Business logic in service files.

import { PageId, PagesDBContract } from 'src/server/domains/pages/tesseract.prismadb';
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

// can extend createCmsPageRequest. But verify with @Justin
export interface UpdateCmsPageRequest {
    slug: string,
    layoutType: string,
    contentData: ContentData,
}

export interface CreatePageResult {
    id: number
}

// I know some mismatches in the response.
// since i coudn't discuss, i am trying to finish the functionalities part
export interface UpdatePageResult {
    // TODO
}

// I know some mismatches in the response.
// since i coudn't discuss, i am trying to finish the functionalities part
export interface DeletePageResult extends CreatePageResult {

}

export interface PagesServiceContract {
    getPageById(id: PageId): Promise<Result<CmsPage, Error>>;

    getPageBySlug(slug: string): Promise<Result<CmsPage, Error>>;

    createPage(req: CreateCmsPageRequest): Promise<CreatePageResult | Error>;

    updatePage(id: PageId, req: UpdateCmsPageRequest): Promise<Result<true, Error>>;

    deletePage(id: PageId): Promise<Result<void, Error>>;

    getAllPages(): Promise<CmsPage[]>
}

export class PagesService implements PagesServiceContract {

    readonly prismaORM: PagesDBContract

    constructor(prismaDB: PagesDBContract) {
        this.prismaORM = prismaDB
    }

    async getPageById(id: PageId): Promise<Result<CmsPage, Error>> {
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

    async updatePage(id: PageId, req: UpdateCmsPageRequest): Promise<Result<true, Error>> {
        const res = await this.prismaORM.getPageById(id)

        if (res === null) {
            return Err(new Error(`Page not found by id: ${id}`))
        }

        await this.prismaORM.updatePage(id, {
            slug: req.slug,
            layoutType: req.layoutType,
            contentData: JSON.stringify(req.contentData),
        })

        return Ok(true)
    }

    async deletePage(id: PageId): Promise<Result<void, Error>> {
        await this.prismaORM.deletePageById(id)

        return Ok.EMPTY
    }

    async getAllPages(): Promise<CmsPage[]> {
        return await this.prismaORM.getAllPages()
    }
}

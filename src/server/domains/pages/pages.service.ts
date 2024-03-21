// Business logic in service files.

import { PagesDBContract } from 'src/server/domains/pages/tesseract.prismadb';
import { CmsPage } from './dto/CmsPage.class';
import Ajv from 'ajv'
const ajv = new Ajv()


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

export interface DeletePageResult {
    // TODO
}

export interface PagesServiceContract {
    getPageById(id: number): Promise<CmsPage | null>;

    getPageBySlug(slug: string): Promise<CmsPage | null>;

    createPage(req: CreateCmsPageRequest): Promise<CreatePageResult | Error>;

    updatePage(req: UpdateCmsPageRequest): Promise<UpdatePageResult>;

    deletePage(id: string): Promise<DeletePageResult>;
}

export class PagesService implements PagesServiceContract {

    readonly prismaORM: PagesDBContract

    constructor(prismaDB: PagesDBContract) {
        this.prismaORM = prismaDB
    }

    async getPageById(id: number): Promise<CmsPage | null> {
        try {
           const res = await this.prismaORM.getPageById(id)

           if (res === null) {
                return null
           }

           return {
                id: res.id,
                slug: res.slug,
                layoutType: res.layoutType,
                contentData: res.contentData,
                published: res.published,
                createdAt: res.createdAt,
                updatedAt: res.updatedAt,
           }
        } catch (err) {
            if (err instanceof Error) {
                throw Error(err.message)
            }

            throw new Error('Method not implemented.');
        }
    }

    async getPageBySlug(slug: string): Promise<CmsPage | null> {
        try {
            const res = await this.prismaORM.getPageBySlug(slug)

            if (res === null) {
                 return null
            }

            return {
                 id: res.id,
                 slug: res.slug,
                 layoutType: res.layoutType,
                 contentData: res.contentData,
                 published: res.published,
                 createdAt: res.createdAt,
                 updatedAt: res.updatedAt,
            }
         } catch (err) {
             if (err instanceof Error) {
                 throw Error(err.message)
             }

             throw new Error('Method not implemented.');
         }
    }

    async createPage(req: CreateCmsPageRequest): Promise<CreatePageResult | Error> {

        // call database class
        try {
            // req validation
            const schema = {
                type: "object",
                properties: {
                    slug: { type: "string", minLength: 3 },
                    layoutType: { type: "string", minLength: 3 },
                    contentData: {
                        type: "object",
                        properties: {
                            leftData: { type: "string" },
                            rightData: { type: "string" }
                        }
                    }
                },
                required: ["slug", "layoutType", "contentData"]
            }

            const validate = ajv.compile(schema)
            const valid = validate(req)

            console.log(validate.errors?.map(e => e.message)[0])

            if (!valid) {
                return new Error("validation errors")
            }

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
        } catch (err) {
            if (err instanceof Error) {
                console.log(err.message)
                return err
            }
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

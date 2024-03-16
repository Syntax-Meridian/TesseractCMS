import { PrismaClient } from '@prisma/client'
import { CmsPage } from './dto/CmsPage.class'

interface Page {
    slug: string,
    layoutType: string,
    contentData: string,
    published: boolean
}

type PageId = number

export interface PagesDBContract {
    savePage(pageData: Page): Promise<PageId>
    getPageById(id: PageId): Promise<CmsPage>
}

export class TesseractPrismaDB implements PagesDBContract
{
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async savePage(pageData: Page): Promise<PageId> {

        const res = await this.prisma.pages.create({
            data: {
                slug: pageData.slug,
                layoutType: pageData.layoutType,
                contentData: pageData.contentData,
                published: pageData.published
            }
        })

        console.log('response on creation', res)

        return res.id
    }

    // async getPageById(id: PageId): Promise<CmsPage> {
    async getPageById(id: PageId): Promise<CmsPage> {

        const res = await this.prisma.pages.findUnique({
            where: {
                id
            }
        })

        console.log('get page by id', res)

        return res as CmsPage
    }
}

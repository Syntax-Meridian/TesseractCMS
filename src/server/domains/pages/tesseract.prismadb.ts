import { PrismaClient } from '@prisma/client'

type Page = {
    slug: string,
    layoutType: string,
    contentData: string,
    published: boolean
}

type PageId = number

export interface PagesDBContract {
    savePage(pageData: Page): Promise<PageId>
}

export class TesseractPrismaDB implements PagesDBContract
{
    prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient()
    }

    async savePage(pageData: Page): Promise<number> {

        const res = await this.prisma.pages.create({
            data: {
                slug: pageData.slug,
                layoutType: pageData.layoutType,
                contentType: pageData.contentData,
                published: pageData.published
            }
        })

        console.log('response on creation', res)

        return res.id
    }
}

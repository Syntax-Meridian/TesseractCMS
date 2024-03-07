import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type page = {
    slug: string,
    layoutType: string,
    contentData: string,
    published: boolean 
}

export interface PagesDBContract {
    savePage(pageData: page): Promise<number>
}

export class TesseractPrismaDB implements PagesDBContract
{
    async savePage(pageData: page): Promise<number> {

        console.log('conntected', pageData)

        const res = await prisma.page.create({
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

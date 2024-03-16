// DTO classes are where we should interface with Prisma
export class CmsPage {
    constructor(
        readonly id: number,
        readonly slug: string,
        readonly layoutType: string,
        readonly contentData: string,
        readonly published: boolean,
        readonly createdAt: Date,
        readonly updatedAt: Date,
    ) {}
}

// DTO classes are where we should interface with Prisma
export class CmsPage {
    constructor(
        public readonly id: number,
        public readonly slug: string,
        public readonly layoutType: string,
        public readonly published: boolean
    ) {}
}

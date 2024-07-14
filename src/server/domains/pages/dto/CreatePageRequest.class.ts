export interface CreatePageRequest {
    layoutType: string,
    contentData: ContentData,
    lastModifiedAt: number,
    createdAt: number,
    published: boolean,
    slug?: string
}

export function createPageReqValidator(_input: unknown): CreatePageRequest {
    // TODO: Verify each piece is the correct data type
    // then return an instance of CreatePageRequest
    throw new Error("Not implemented yet");
}

export type ContentData = SingleColumnContent | DualColumnContent | TripleColumnContent

export interface SingleColumnContent {}
export interface DualColumnContent {}
export interface TripleColumnContent {}

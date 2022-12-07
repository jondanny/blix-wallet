export declare class CursorFilterDto {
    afterCursor?: string;
    beforeCursor?: string;
    limit: number;
    orderParam: string;
    orderType: 'ASC' | 'DESC';
    constructor(partial?: Partial<CursorFilterDto>);
}

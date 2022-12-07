export declare class PaginatedResultCursor {
    beforeCursor: string | null;
    afterCursor: string | null;
}
export declare class PaginatedResult<T> {
    data: T[];
    cursor: PaginatedResultCursor;
}

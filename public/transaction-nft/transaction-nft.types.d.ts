import { PaginatedResultCursor } from '@src/common/pagination/pagination.types';
import { TransactionNft } from './transaction-nft.entity';
export declare class TransactionNftPaginatedResult {
    data: TransactionNft[];
    cursor: PaginatedResultCursor;
}

import { PaginatedResultCursor } from '@src/common/pagination/pagination.types';
import { TransactionMatic } from './transaction-matic.entity';
export declare class TransactionMaticPaginatedResult {
    data: TransactionMatic[];
    cursor: PaginatedResultCursor;
}

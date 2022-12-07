import { CursorFilterDto } from '@src/common/pagination/cursor-filter.dto';
import { TransactionMatic } from '../transaction-matic.entity';
export declare class FindTransactionMaticDto extends CursorFilterDto {
    walletAddress: string;
    orderParam: keyof TransactionMatic;
    limit: number;
}

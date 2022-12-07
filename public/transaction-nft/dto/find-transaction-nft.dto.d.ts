import { CursorFilterDto } from '@src/common/pagination/cursor-filter.dto';
import { TransactionNft } from '../transaction-nft.entity';
export declare class FindTransactionNftDto extends CursorFilterDto {
    walletAddress: string;
    orderParam: keyof TransactionNft;
    limit: number;
}

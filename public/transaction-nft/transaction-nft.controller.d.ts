import { FindTransactionNftDto } from './dto/find-transaction-nft.dto';
import { TransactionNftService } from './transaction-nft.service';
import { TransactionNftPaginatedResult } from './transaction-nft.types';
export declare class TransactionNftController {
    private readonly transactionNftService;
    constructor(transactionNftService: TransactionNftService);
    findAllPaginated(searchParams: FindTransactionNftDto): Promise<TransactionNftPaginatedResult>;
}

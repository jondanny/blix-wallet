import { FindTransactionMaticDto } from './dto/find-transaction-matic.dto';
import { TransactionMaticService } from './transaction-matic.service';
import { TransactionMaticPaginatedResult } from './transaction-matic.types';
export declare class TransactionMaticController {
    private readonly transactionMaticService;
    constructor(transactionMaticService: TransactionMaticService);
    findAllPaginated(searchParams: FindTransactionMaticDto): Promise<TransactionMaticPaginatedResult>;
}

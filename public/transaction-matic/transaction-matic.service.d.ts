import { FindTransactionMaticDto } from './dto/find-transaction-matic.dto';
import { TransactionMaticRepository } from './transaction-matic.repository';
import { TransactionMaticPaginatedResult } from './transaction-matic.types';
export declare class TransactionMaticService {
    private readonly transactionMaticRepository;
    constructor(transactionMaticRepository: TransactionMaticRepository);
    findAllPaginated(searchParams: FindTransactionMaticDto): Promise<TransactionMaticPaginatedResult>;
}

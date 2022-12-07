import { FindTransactionNftDto } from './dto/find-transaction-nft.dto';
import { TransactionNftRepository } from './transaction-nft.repository';
import { TransactionNftPaginatedResult } from './transaction-nft.types';
export declare class TransactionNftService {
    private readonly transactionNftRepository;
    constructor(transactionNftRepository: TransactionNftRepository);
    findAllPaginated(searchParams: FindTransactionNftDto): Promise<TransactionNftPaginatedResult>;
}

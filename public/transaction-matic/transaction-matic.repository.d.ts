import { DataSource, Repository } from 'typeorm';
import { PagingResult } from 'typeorm-cursor-pagination';
import { FindTransactionMaticDto } from './dto/find-transaction-matic.dto';
import { TransactionMatic } from './transaction-matic.entity';
export declare class TransactionMaticRepository extends Repository<TransactionMatic> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getPaginatedQueryBuilder(searchParams: FindTransactionMaticDto): Promise<PagingResult<TransactionMatic>>;
}

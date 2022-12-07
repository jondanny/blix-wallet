import { DataSource, Repository } from 'typeorm';
import { PagingResult } from 'typeorm-cursor-pagination';
import { FindTransactionNftDto } from './dto/find-transaction-nft.dto';
import { TransactionNft } from './transaction-nft.entity';
export declare class TransactionNftRepository extends Repository<TransactionNft> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getPaginatedQueryBuilder(searchParams: FindTransactionNftDto): Promise<PagingResult<TransactionNft>>;
}

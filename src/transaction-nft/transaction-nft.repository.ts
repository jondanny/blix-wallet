import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { buildPaginator, PagingResult } from 'typeorm-cursor-pagination';
import { FindTransactionNftDto } from './dto/find-transaction-nft.dto';
import { TransactionNft } from './transaction-nft.entity';

@Injectable()
export class TransactionNftRepository extends Repository<TransactionNft> {
  constructor(private readonly dataSource: DataSource) {
    super(TransactionNft, dataSource.manager);
  }

  async getPaginatedQueryBuilder(searchParams: FindTransactionNftDto): Promise<PagingResult<TransactionNft>> {
    const queryBuilder = this.createQueryBuilder('transaction_nft')
      .leftJoinAndSelect('transaction_nft.wallet_address', 'wallet_address')
      .where({ walletAddressFrom: searchParams.walletAddress });

    const paginator = buildPaginator({
      entity: TransactionNft,
      paginationKeys: ['id', searchParams.orderParam],
      query: {
        limit: searchParams.limit,
        order: searchParams.orderType,
        afterCursor: searchParams.afterCursor,
        beforeCursor: searchParams.beforeCursor,
      },
    });

    return paginator.paginate(queryBuilder);
  }
}

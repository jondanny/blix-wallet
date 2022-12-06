import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { buildPaginator, PagingResult } from 'typeorm-cursor-pagination';
import { FindTransactionMaticDto } from './dto/find-transaction-matic.dto';
import { TransactionMatic } from './transaction-matic.entity';

@Injectable()
export class TransactionMaticRepository extends Repository<TransactionMatic> {
  constructor(private readonly dataSource: DataSource) {
    super(TransactionMatic, dataSource.manager);
  }

  async getPaginatedQueryBuilder(searchParams: FindTransactionMaticDto): Promise<PagingResult<TransactionMatic>> {
    const queryBuilder = this.createQueryBuilder('transaction_matic')
      .leftJoinAndSelect('transaction_matic.wallet_address', 'wallet_address')
      .where({ walletAddressFrom: searchParams.walletAddress });

    const paginator = buildPaginator({
      entity: TransactionMatic,
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

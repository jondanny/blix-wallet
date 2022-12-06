import { Injectable } from '@nestjs/common';
import { FindTransactionNftDto } from './dto/find-transaction-nft.dto';
import { TransactionNftRepository } from './transaction-nft.repository';
import { TransactionNftPaginatedResult } from './transaction-nft.types';

@Injectable()
export class TransactionNftService {
  constructor(private readonly transactionNftRepository: TransactionNftRepository) {}

  async findAllPaginated(searchParams: FindTransactionNftDto): Promise<TransactionNftPaginatedResult> {
    return this.transactionNftRepository.getPaginatedQueryBuilder(searchParams);
  }
}

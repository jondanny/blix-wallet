import { Injectable } from '@nestjs/common';
import { FindTransactionMaticDto } from './dto/find-transaction-matic.dto';
import { TransactionMaticRepository } from './transaction-matic.repository';
import { TransactionMaticPaginatedResult } from './transaction-matic.types';

@Injectable()
export class TransactionMaticService {
  constructor(private readonly transactionMaticRepository: TransactionMaticRepository) {}

  async findAllPaginated(searchParams: FindTransactionMaticDto): Promise<TransactionMaticPaginatedResult> {
    return this.transactionMaticRepository.getPaginatedQueryBuilder(searchParams);
  }
}

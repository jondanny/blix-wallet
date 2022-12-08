import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultCursor } from '../common/pagination/pagination.types';
import { TransactionMatic } from './transaction-matic.entity';

export class TransactionMaticPaginatedResult {
  @ApiProperty({ isArray: true, type: () => TransactionMatic })
  data: TransactionMatic[];

  @ApiProperty()
  cursor: PaginatedResultCursor;
}

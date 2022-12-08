import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResultCursor } from '../common/pagination/pagination.types';
import { TransactionNft } from './transaction-nft.entity';

export class TransactionNftPaginatedResult {
  @ApiProperty({ isArray: true, type: () => TransactionNft })
  data: TransactionNft[];

  @ApiProperty()
  cursor: PaginatedResultCursor;
}

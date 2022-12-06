import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';
import { CursorFilterDto } from '@src/common/pagination/cursor-filter.dto';
import { TransactionNft } from '../transaction-nft.entity';
import { Type } from 'class-transformer';

export class FindTransactionNftDto extends CursorFilterDto {
  @ApiProperty({ example: '8e9c3708-25d8-467f-9a68-00507f8ece4a', required: false })
  @IsEthereumAddress()
  walletAddress: string;

  @ApiProperty({ example: 'createdAt', enum: ['createdAt', 'status'], required: false })
  @IsOptional()
  @IsIn(['createdAt'])
  orderParam: keyof TransactionNft = 'createdAt';

  @ApiProperty({ example: 10, minimum: 1, maximum: 50, required: false })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  limit = 50;
}

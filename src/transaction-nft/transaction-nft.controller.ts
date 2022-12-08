import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseHelper } from '../common/helpers/api-response.helper';
import { FindTransactionNftDto } from './dto/find-transaction-nft.dto';
import { TransactionNft } from './transaction-nft.entity';
import { TransactionNftService } from './transaction-nft.service';
import { TransactionNftPaginatedResult } from './transaction-nft.types';

@Controller('transaction-nft')
export class TransactionNftController {
  constructor(private readonly transactionNftService: TransactionNftService) {}

  @ApiOperation({ description: `Get all transactions by wallet address` })
  @ApiResponse(ApiResponseHelper.success(TransactionNft))
  @ApiResponse(ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)']))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAllPaginated(@Query() searchParams: FindTransactionNftDto): Promise<TransactionNftPaginatedResult> {
    return this.transactionNftService.findAllPaginated(searchParams);
  }
}

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
import { FindTransactionMaticDto } from './dto/find-transaction-matic.dto';
import { TransactionMatic } from './transaction-matic.entity';
import { TransactionMaticService } from './transaction-matic.service';
import { TransactionMaticPaginatedResult } from './transaction-matic.types';

@Controller('transaction-matic')
export class TransactionMaticController {
  constructor(private readonly transactionMaticService: TransactionMaticService) {}

  @ApiOperation({ description: `Get all transactions by wallet address` })
  @ApiResponse(ApiResponseHelper.success(TransactionMatic))
  @ApiResponse(ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)']))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAllPaginated(@Query() searchParams: FindTransactionMaticDto): Promise<TransactionMaticPaginatedResult> {
    return this.transactionMaticService.findAllPaginated(searchParams);
  }
}

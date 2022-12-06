import { Module } from '@nestjs/common';
import { TransactionMaticService } from './transaction-matic.service';
import { TransactionMaticController } from './transaction-matic.controller';

@Module({
  providers: [TransactionMaticService],
  controllers: [TransactionMaticController],
})
export class TransactionMaticModule {}

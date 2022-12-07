import { Module } from '@nestjs/common';
import { TransactionMaticService } from './transaction-matic.service';
import { TransactionMaticController } from './transaction-matic.controller';
import { TransactionMaticRepository } from './transaction-matic.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionMatic } from './transaction-matic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionMatic])],
  providers: [TransactionMaticService, TransactionMaticRepository],
  controllers: [TransactionMaticController],
  exports: [TransactionMaticService],
})
export class TransactionMaticModule {}

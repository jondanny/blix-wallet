import { Module } from '@nestjs/common';
import { TransactionNftService } from './transaction-nft.service';
import { TransactionNftController } from './transaction-nft.controller';

@Module({
  providers: [TransactionNftService],
  controllers: [TransactionNftController],
})
export class TransactionNftModule {}

import { Module } from '@nestjs/common';
import { TransactionNftService } from './transaction-nft.service';
import { TransactionNftController } from './transaction-nft.controller';
import { TransactionNftRepository } from './transaction-nft.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionNft } from './transaction-nft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionNft])],
  providers: [TransactionNftService, TransactionNftRepository],
  controllers: [TransactionNftController],
  exports: [TransactionNftService],
})
export class TransactionNftModule {}

import { Injectable } from '@nestjs/common';
import { Wallet } from '@src/wallet/wallet.entity';
import { DataSource, Repository } from 'typeorm';
import { Nft } from './nft.entity';

@Injectable()
export class NftRepository extends Repository<Nft> {
  constructor(private readonly dataSource: DataSource) {
    super(Nft, dataSource.manager);
  }

  async findMany(wallets: Wallet[]): Promise<Nft[]> {
    const queryBuilder = this.createQueryBuilder('nft')
      .leftJoinAndSelect('nft.wallet', 'wallet')
      .where({ walletAddress: wallets[0].walletAddress });
    if (wallets.length > 1) {
      queryBuilder.orWhere({ walletAddress: wallets[1].walletAddress });
    }

    const nfts = await queryBuilder.getRawMany();

    return nfts;
  }
}

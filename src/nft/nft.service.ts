import { Injectable } from '@nestjs/common';
import { WalletType } from '@src/wallet/wallet.types';
import { NftCreateDto } from './dto/nft-create.dto';
import { Nft } from './nft.entity';
import { NftRepository } from './nft.repository';

@Injectable()
export class NftService {
  constructor(private readonly nftRepository: NftRepository) {}

  async create(data: NftCreateDto): Promise<Nft> {
    return await this.nftRepository.save(data);
  }

  async findOne(id: number) {
    return this.nftRepository.findOneBy({ id });
  }

  async findByTokenId(tokenId: string) {
    return this.nftRepository.findOneBy({ tokenId });
  }

  async exists(param: Partial<Nft>): Promise<boolean> {
    return this.nftRepository.exists(param);
  }

  async findAllByUserUuid(userUuid: string): Promise<Nft[]> {
    return this.nftRepository.find({ where: { userUuid } });
  }

  async transfer(tokenId: string) {
    const oldNft = await this.findByTokenId(tokenId);
    await this.nftRepository.update({ tokenId }, { ...oldNft, walletType: WalletType.Metamask, updatedAt: new Date() });

    return await this.nftRepository.findOneBy({ tokenId });
  }

  async remove(id: number) {
    await this.nftRepository.softDelete({ id });

    return;
  }
}

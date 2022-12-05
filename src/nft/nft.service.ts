import { Injectable } from '@nestjs/common';
import { NftRepository } from './nft.repository';

@Injectable()
export class NftService {
  constructor(private readonly nftRepository: NftRepository) {}

  async create(walletAddress: string, tokenId: number) {
    const nft = await this.nftRepository.create({ walletAddress, tokenId });

    return this.nftRepository.findOneBy({ id: nft.id });
  }

  async findOne(id: number) {
    return this.nftRepository.findOneBy({ id });
  }

  async findByTokenId(tokenId: number) {
    return this.nftRepository.findOneBy({ tokenId });
  }

  async findAllByWalletAddress(walletAddress: string) {
    return this.nftRepository.find({ where: { walletAddress } });
  }

  async transfer(tokenId: number, walletAddress: string) {
    console.log('walletAddress:', walletAddress);
    const oldNft = await this.findByTokenId(tokenId);
    await this.nftRepository.update({ tokenId }, { ...oldNft, walletAddress, updatedAt: new Date() });

    return await this.nftRepository.findOneBy({ tokenId });
  }

  async remove(id: number) {
    await this.nftRepository.softDelete({ id });

    return;
  }
}

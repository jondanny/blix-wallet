import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { WalletService } from 'src/wallet/wallet.service';
import { NftCreateDto } from './dto/nft-create.dto';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService, private readonly walletService: WalletService) {}

  @Get()
  async findAll(@Query('address') walletAddress: string) {
    return this.nftService.findAllByWalletAddress(walletAddress);
  }

  @Post()
  async create(@Body() body: NftCreateDto) {
    const { walletAddress } = await this.walletService.findByUserUuid(body.userUuid);

    return this.nftService.create(walletAddress, body.tokenId);
  }

  @Delete(':tokenId')
  async remove(@Param('tokenId', ParseIntPipe) tokenId: number) {
    return this.nftService.remove(tokenId);
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseHelper } from 'src/common/helpers/api-response.helper';
import { WalletService } from 'src/wallet/wallet.service';
import { NftCreateDto } from './dto/nft-create.dto';
import { Nft } from './nft.entity';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService, private readonly walletService: WalletService) {}

  @ApiOperation({ description: `Get all nfts by userUuid` })
  @ApiResponse(ApiResponseHelper.success(Nft))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAllByUserUuid(@Query('userUuid') userUuid: string) {
    const wallets = await this.walletService.findAllByUserUuid(userUuid);

    let nfts: Nft[];
    if (wallets.length) {
      nfts = await this.nftService.findAll(wallets);
    }

    return nfts;
  }

  @ApiOperation({ description: `Add nft and owner info to Nft table when minting` })
  @ApiResponse(ApiResponseHelper.created(Nft))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: NftCreateDto): Promise<Nft> {
    const { walletAddress } = await this.walletService.findByUserUuidAndType(body.userUuid, body.walletType);

    return this.nftService.create(walletAddress, body.tokenId);
  }
}

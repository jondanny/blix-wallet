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
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';
import { WalletService } from 'src/wallet/wallet.service';
import { NftCreateDto } from './dto/nft-create.dto';
import { Nft } from './nft.entity';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService, private readonly walletService: WalletService) {}

  @ApiOperation({ description: `Get all nfts by wallet address` })
  @ApiResponse(ApiResponseHelper.success(Nft))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAll(@Query('address') walletAddress: string) {
    return this.nftService.findAllByWalletAddress(walletAddress);
  }

  @ApiOperation({ description: `Add nft and owner info to Nft table when minting` })
  @ApiResponse(ApiResponseHelper.created(Nft))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async create(@Body() body: NftCreateDto) {
    const { walletAddress } = await this.walletService.findByUserUuid(body.userUuid);

    return this.nftService.create(walletAddress, body.tokenId);
  }
}

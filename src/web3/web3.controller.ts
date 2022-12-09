import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Web3Service } from './web3.service';
import { WalletService } from '@src/wallet/wallet.service';
import { NftTransferDto } from './dto/nft-transfer.dto';
import { Wallet } from '@src/wallet/wallet.entity';
import { NftService } from '@src/nft/nft.service';
import { WalletCreateDto } from './dto/wallet-create.dto';
import { ApiResponseHelper } from '../common/helpers/api-response.helper';
import { WalletType } from '@src/wallet/wallet.types';

@Controller()
export class Web3Controller {
  private readonly logger = new Logger(Web3Controller.name);

  constructor(
    private readonly web3Service: Web3Service,
    private readonly walletService: WalletService,
    private readonly nftService: NftService,
  ) {}

  @ApiOperation({ description: `Create wallet for a user` })
  @ApiResponse(ApiResponseHelper.created(String))
  @ApiResponse(ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)']))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('create-wallet')
  async createBlixWallet(@Body() body: WalletCreateDto): Promise<string> {
    try {
      const { address, privateKey } = await this.web3Service.createWallet();

      if (!address || !privateKey) {
        throw new HttpException('Failed to create wallet', HttpStatus.INTERNAL_SERVER_ERROR);
      }

      const wallet: Wallet = await this.walletService.create({
        userUuid: body.userUuid,
        walletAddress: address,
        privateKey,
        type: WalletType.Blix,
      });

      if (!wallet) {
        throw new HttpException(`Failed to store wallet information in database`, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      this.logger.log(`Wallet created for user ${body.userUuid}: ${wallet.walletAddress}`);

      return wallet.walletAddress;
    } catch (err) {
      throw err;
    }
  }

  @ApiOperation({ description: `Get user's Matic balance` })
  @ApiResponse(ApiResponseHelper.success(Number))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get('balance')
  async getBalance(@Query('address') address: string): Promise<number> {
    return this.web3Service.getMaticBalance(address);
  }

  @ApiOperation({ description: `Transfer NFT to another user` })
  @Post('transfer-to-metamask')
  async transferNft(@Body() body: NftTransferDto) {
    try {
      const wallets = await this.walletService.findAllByUserUuid(body.userUuid);

      if (wallets.length !== 2) {
        throw new Error(`User does not have both Blix and Metamask wallet`);
      }

      const transactionHash = await this.web3Service.transferNft(
        wallets[0].privateKey,
        wallets[0].walletAddress,
        wallets[1].walletAddress,
        body.tokenId,
      );

      if (!transactionHash) {
        throw new Error(`Transaction hash not found`);
      }

      const nft = await this.nftService.transfer(body.tokenId, wallets[1].walletAddress);

      if (!nft) {
        throw new Error(`Failed to update database`);
      }

      this.logger.log(`NFT transfered, hash: ${transactionHash}`);

      return transactionHash;
    } catch (err) {
      return this.logger.error(err.message);
    }
  }
}

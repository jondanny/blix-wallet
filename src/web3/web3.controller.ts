import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Web3Service } from './web3.service';
import { WalletService } from '@src/wallet/wallet.service';
import { NftTransferDto } from './dto/nft-transfer.dto';
import { Wallet } from '@src/wallet/wallet.entity';
import { WalletCreateDto } from './dto/wallet-create.dto';
import { ApiResponseHelper } from '../common/helpers/api-response.helper';
import { WalletType } from '@src/wallet/wallet.types';
import { AdminWalletService } from '@src/admin-wallet/admin-wallet.service';
import { NftMintDto } from './dto/nft-mint.dto';
import { AdminWalletUsage } from '@src/admin-wallet/admin-wallet.types';
import { CreateAdminDto } from './dto/create-admin.dto';

@Controller()
export class Web3Controller {
  private readonly logger = new Logger(Web3Controller.name);

  constructor(
    private readonly web3Service: Web3Service,
    private readonly walletService: WalletService,
    private readonly adminWalletService: AdminWalletService,
    @InjectQueue('web3-queue') private queue: Queue,
  ) { }

  @ApiOperation({ description: `Create wallet for a user` })
  @ApiResponse(ApiResponseHelper.created())
  @ApiResponse(ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)']))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('create-wallet')
  async createBlixWallet(@Body() body: WalletCreateDto) {
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

      return {
        message: 'wallet_created',
        walletAddress: wallet.walletAddress,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @ApiOperation({ description: `Mint nft to specific wallet` })
  @ApiResponse(ApiResponseHelper.created())
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('mint-nft')
  async mintNft(@Body() body: NftMintDto) {
    let job = await this.queue.add('web3-mint-job', { body });

    console.log(job)
  }

  @ApiOperation({ description: `Transfer NFT to user's external metamask wallet` })
  @ApiResponse(ApiResponseHelper.success(String))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('transfer-to-metamask')
  async transferToMetamask(@Body() body: NftTransferDto) {
    await this.queue.add('web3-transfer-job', { body });
  }

  @ApiOperation({ description: `Create an admin wallet and send 5 Matic` })
  @ApiResponse(ApiResponseHelper.created())
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('create-admin')
  async createAdmin(@Body() body: CreateAdminDto) {
    const { address, privateKey } = await this.web3Service.createAdmin(body.amount);

    const adminWallet = await this.adminWalletService.create({
      walletAddress: address,
      privateKey: privateKey.slice(2),
      inUse: AdminWalletUsage.NotInUse,
    });

    this.logger.log(`Admin account "${address}" is created. Matic balance: ${body.amount}`);

    return adminWallet;
  }
}

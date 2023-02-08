import { ConfigService } from '@nestjs/config';
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
import { NftService } from '@src/nft/nft.service';
import { WEB3_QUEUE, Web3QueueActions } from './web3.types';

@Controller()
export class Web3Controller {
  private readonly logger = new Logger(Web3Controller.name);
  private nftContractAddress;
  private network;
  private adminApiPassword;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly walletService: WalletService,
    private readonly nftService: NftService,
    private readonly adminWalletService: AdminWalletService,
    private readonly configService: ConfigService,
    @InjectQueue(WEB3_QUEUE) private web3Queue: Queue,
  ) {
    this.network = this.configService.get('web3Config.network');
    this.nftContractAddress = this.configService.get('web3Config.nftContractAddress');
    this.adminApiPassword = this.configService.get('appConfig.adminApiPassword');
  }

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
    let adminWalletId = 0;

    try {
      const {
        id,
        privateKey: operator,
        walletAddress: adminWallet,
      } = await this.adminWalletService.findFreeEnoughAndSetInUse();

      if (!id) {
        throw new Error(`No free admin wallet is available`);
      }

      adminWalletId = id;

      const { walletAddress: receiver } = await this.walletService.findByUserUuidAndType(
        body.userUuid,
        body.walletType,
      );
      const tokenId = await this.web3Service.mint(operator, receiver, body.metadataUri);
      const uniqueId = `${this.network}:${this.nftContractAddress}:${tokenId}`;

      if (!tokenId) {
        throw new Error(`Empty tokenId received, admin account used: ${adminWallet}`);
      }

      const nft = await this.nftService.save({
        tokenId: uniqueId,
        userUuid: body.userUuid,
        walletType: body.walletType,
      });

      if (!nft) {
        throw new Error(`Failed to save nft in the database`);
      }

      this.logger.log(
        `NFT minted, tokenId: ${uniqueId}, ipfsUri: ${body.metadataUri}, admin account used: ${adminWallet}`,
      );

      return nft;
    } catch (err) {
      this.logger.error(err.message);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await this.adminWalletService.setNotInUse(adminWalletId);
    }
  }

  @ApiOperation({ description: `Transfer NFT to user's external metamask wallet` })
  @ApiResponse(ApiResponseHelper.success(String))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('transfer-to-metamask')
  async transferToMetamask(@Body() body: NftTransferDto) {
    let adminWalletId = 0;

    try {
      const {
        id,
        privateKey: operator,
        walletAddress: adminWallet,
      } = await this.adminWalletService.findFreeEnoughAndSetInUse();

      if (!id) {
        throw new Error(`No free admin wallet is available`);
      }

      adminWalletId = id;
      const blixWallet = await this.walletService.findByUserUuidAndType(body.userUuid, WalletType.Blix);
      const metamaskWallet = await this.walletService.findByUserUuidAndType(body.userUuid, WalletType.Metamask);

      if (!blixWallet || !metamaskWallet) {
        throw new Error(`User does not have Blix or Metamask wallet`);
      }

      const tokenId = parseInt(body.tokenId.split(':')[2]);
      console.log('operator:', operator);
      const transactionHash = await this.web3Service.transferNft(
        operator,
        blixWallet.walletAddress,
        metamaskWallet.walletAddress,
        tokenId,
      );

      if (!transactionHash) {
        throw new Error(`Transaction hash not found`);
      }

      const nft = await this.nftService.transfer(body.tokenId);

      if (!nft) {
        throw new Error(`Database Error: Failed to update database`);
      }

      this.logger.log(
        `NFT transfered, tokenId: ${body.tokenId}, hash: ${transactionHash}, admin account used: ${adminWallet}`,
      );

      return {
        message: 'nft_transfered_to_metamask',
        transactionHash,
      };
    } catch (err) {
      this.logger.error(err.message);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await this.adminWalletService.setNotInUse(adminWalletId);
    }
  }

  @ApiOperation({ description: `Create an admin wallet and send initial Matic` })
  @ApiResponse(ApiResponseHelper.created())
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('create-admin')
  async createAdmin(@Body() body: CreateAdminDto) {
    if (body.password !== this.adminApiPassword)
      throw new HttpException('Admin authentication failed', HttpStatus.BAD_REQUEST);

    const { address, privateKey } = await this.web3Service.createAdmin(body.amount);

    const adminWallet = await this.adminWalletService.create({
      walletAddress: address,
      privateKey: privateKey.slice(2),
      inUse: AdminWalletUsage.NotInUse,
    });

    this.logger.log(`Admin account "${address}" is created. Matic balance: ${body.amount}`);

    return { walletAddress: adminWallet.walletAddress, privateKey: adminWallet.privateKey };
  }

  @ApiOperation({ description: `Find admin accounts short of gas fee` })
  @ApiResponse(ApiResponseHelper.created())
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('check-low-balance')
  async checkLowBalance(@Body('password') password: string) {
    if (password !== this.adminApiPassword)
      throw new HttpException('Admin authentication failed', HttpStatus.BAD_REQUEST);

    return this.adminWalletService.checkLowBalance();
  }

  @ApiOperation({ description: `Find admin accounts short of gas fee and send Matic` })
  @ApiResponse(ApiResponseHelper.created())
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('refill-matic')
  async refillMatic(@Body('password') password: string) {
    if (password !== this.adminApiPassword)
      throw new HttpException('Admin authentication failed', HttpStatus.BAD_REQUEST);

    const accounts = await this.adminWalletService.findAccountWithNoMatic();
    const addresses = accounts.map((account) => account.walletAddress);

    await this.web3Queue.add(Web3QueueActions.RefillAllAccounts, { body: { addresses } });
  }
}

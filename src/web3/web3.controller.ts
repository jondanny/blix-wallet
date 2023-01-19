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
import { ConfigService } from '@nestjs/config';

@Controller()
export class Web3Controller {
  private readonly logger = new Logger(Web3Controller.name);
  private nftContractAddress;
  private network;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly walletService: WalletService,
    private readonly nftService: NftService,
    private readonly adminWalletService: AdminWalletService,
    private readonly configService: ConfigService,
  ) {
    this.network = this.configService.get('web3Config.network');
    this.nftContractAddress = this.configService.get('web3Config.nftContractAddress');
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
      } = await this.adminWalletService.findFreeAndSetInUse();

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
      } = await this.adminWalletService.findFreeAndSetInUse();

      if (!id) {
        throw new Error(`No free admin wallet is available`);
      }

      adminWalletId = id;
      const wallets = await this.walletService.findAllByUserUuid(body.userUuid);

      if (wallets.length !== 2) {
        throw new Error(`User does not have all Blix and Metamask wallet`);
      }

      const tokenId = parseInt(body.tokenId.split(':')[2]);

      const transactionHash = await this.web3Service.transferNft(
        operator,
        wallets[0].walletAddress,
        wallets[1].walletAddress,
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

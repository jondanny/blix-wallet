import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Web3Service } from './web3.service';
import { WalletService } from '../wallet/wallet.service';
import { NftTransferDto } from './dto/nft-transfer.dto';
import { MaticTransferDto } from './dto/matic-transfer.dto';
import { Wallet } from '../wallet/wallet.entity';
import { NftService } from 'src/nft/nft.service';
import { WalletCreateDto } from './dto/wallet-create.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';

@Controller()
export class Web3Controller {
  private readonly logger = new Logger(Web3Controller.name);

  constructor(
    private readonly web3Service: Web3Service,
    private readonly walletService: WalletService,
    private readonly nftService: NftService,
  ) {}

  @ApiOperation({ description: `Create wallet for a user` })
  @ApiResponse(ApiResponseHelper.created(Wallet))
  @ApiResponse(ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)']))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('create-wallet')
  async createWallet(@Body() body: WalletCreateDto): Promise<Wallet> {
    try {
      const { address, privateKey } = await this.web3Service.createWallet();

      if (!address || !privateKey) {
        throw new Error('Wallet creation error');
      }

      const wallet = await this.walletService.create({
        userUuid: body.userUuid,
        walletAddress: address,
        privateKey,
      });

      if (!wallet) {
        throw new Error('Wallet saving error');
      }

      this.logger.log(`Wallet created for user ${body.userUuid}: ${wallet.walletAddress}`);

      return wallet;
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

  @ApiOperation({ description: `Transfer matic to another user` })
  @Post('transfer-matic')
  async transferMatic(@Body() body: MaticTransferDto) {
    try {
      const { walletAddress, privateKey } = await this.walletService.findByUserUuid(body.userUuidFrom);

      const transactionHash = await this.web3Service.transferMatic(
        privateKey,
        walletAddress,
        body.walletAddressTo,
        body.amount,
      );

      this.logger.log(`Matic transfered, hash: ${transactionHash}`);

      return transactionHash;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ description: `Transfer NFT to another user` })
  @Post('transfer-nft')
  async transferNft(@Body() body: NftTransferDto) {
    try {
      const from = await this.walletService.findByUserUuid(body.userUuidFrom);

      if (!from) {
        throw new Error('User in the transfer not found in the database');
      }

      const transactionHash = await this.web3Service.transferNft(
        from.privateKey,
        from.walletAddress,
        body.walletAddressTo,
        body.tokenId,
      );

      if (!transactionHash) {
        throw new Error(`Transaction hash not found`);
      }

      const nft = await this.nftService.transfer(body.tokenId, body.walletAddressTo);

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

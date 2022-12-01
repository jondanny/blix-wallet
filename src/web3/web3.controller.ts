import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { WalletService } from '../wallet/wallet.service';
import { NftTransferDto } from './dto/nft-transfer.dto';
import { MaticTransferDto } from './dto/matic-transfer.dto';
import { Wallet } from '../wallet/wallet.entity';
import { NftService } from 'src/nft/nft.service';
import { WalletCreateDto } from './dto/wallet-create.dto';

@Controller()
export class Web3Controller {
  private readonly logger = new Logger(Web3Controller.name);

  constructor(
    private readonly web3Service: Web3Service,
    private readonly walletService: WalletService,
    private readonly nftService: NftService,
  ) {}

  @Post('create-wallet')
  async createWallet(@Body() body: WalletCreateDto): Promise<Wallet | void> {
    const walletExists = await this.walletService.exists(body.userUuid);

    if (walletExists) {
      return this.logger.error(`Wallet for user ${body.userUuid} already exists`);
    }

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
      return this.logger.error(err.message);
    }
  }

  @Get('balance')
  async getBalance(@Query('address') address: string): Promise<number> {
    return this.web3Service.getMaticBalance(address);
  }

  @Post('transfer-matic')
  async transferMatic(@Body() body: MaticTransferDto) {
    try {
      const { walletAddress, privateKey } = await this.walletService.findByUserUuid(body.userUuidFrom);

      const transactionHash = this.web3Service.transferMatic(
        privateKey,
        walletAddress,
        body.walletAddressTo,
        body.amount,
      );

      return this.logger.log(`Matic transfered, hash: ${transactionHash}`);
    } catch (error) {
      throw error;
    }
  }

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

      const nft = await this.nftService.transfer(body.tokenId, from.walletAddress);

      if (!nft) {
        throw new Error(`Failed to update database`);
      }

      return this.logger.log(`NFT transfered, hash: ${transactionHash}`);
    } catch (err) {
      return this.logger.error(err.message);
    }
  }
}

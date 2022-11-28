import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { WalletService } from '../wallet/wallet.service';
import { NftTransferDto } from './dto/nft-transfer.dto';
import { MaticTransferDto } from './dto/matic-transfer.dto';
import { AdminWalletService } from '../admin-wallet/admin-wallet.service';
import { Wallet } from '../wallet/wallet.entity';

@Controller('web3')
export class Web3Controller {
  private readonly logger = new Logger(Web3Controller.name);

  constructor(
    private readonly web3Service: Web3Service,
    private readonly walletService: WalletService,
    private readonly adminWalletService: AdminWalletService,
  ) {}

  @Post('create-wallet')
  async createWallet(@Body('userUuid') userUuid: string): Promise<Wallet | void> {
    const walletExists = await this.walletService.exists(userUuid);

    if (walletExists) {
      return this.logger.error(`Wallet for user ${userUuid} already exists`);
    }

    try {
      const { address, privateKey } = await this.web3Service.createWallet();

      if (!address || !privateKey) {
        throw new Error('Wallet creation error');
      }

      const user = await this.walletService.create({
        userUuid: userUuid,
        walletAddress: address,
        privateKey,
      });

      if (!user) {
        throw new Error('Wallet saving error');
      }

      this.logger.log(`Wallet created for user ${userUuid}: ${user.walletAddress}`);

      return user;
    } catch (err) {
      return this.logger.error(err.message);
    }
  }

  @Get('balance')
  async getBalance(@Query('address') address: string): Promise<number> {
    return this.web3Service.getBalance(address);
  }

  @Post('transfer-matic')
  async transferMatic(@Body() MaticTransferDto: MaticTransferDto) {
    try {
      const { walletAddress, privateKey } = await this.walletService.findByUserUuid(MaticTransferDto.userUuid);

      const transactionHash = this.web3Service.transferMatic(
        privateKey,
        walletAddress,
        MaticTransferDto.to,
        MaticTransferDto.amount,
      );

      return this.logger.log(`Matic transfered, hash: ${transactionHash}`);
    } catch (error) {
      throw error;
    }
  }

  @Post('transfer-nft')
  async transferNft(@Body() NftTransferDto: NftTransferDto) {
    let adminWalletId = 0;

    try {
      const from = await this.walletService.findByUserUuid(NftTransferDto.userUuidFrom);
      const to = await this.walletService.findByUserUuid(NftTransferDto.userUuidTo);

      if (!from || !to) {
        throw new Error('One or many users in the transfer not found in the database');
      }

      const { id, privateKey: operator, walletAddress } = await this.adminWalletService.findFreeAndSetInUse();

      if (!id) {
        throw new Error(`No free admin wallet is available`);
      }

      adminWalletId = id;
      const transactionHash = await this.web3Service.transferNft(
        operator,
        from.walletAddress,
        to.walletAddress,
        NftTransferDto.tokenId,
      );

      if (!transactionHash) {
        throw new Error(`Transaction hash not found, admin account used: ${walletAddress}`);
      }

      return this.logger.log(`NFT transfered, hash: ${transactionHash}`);
    } catch (err) {
      return this.logger.error(err.message);
    } finally {
      await this.adminWalletService.setNotInUse(adminWalletId);
    }
  }
}

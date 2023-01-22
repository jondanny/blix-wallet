import { nftContractAddress } from '@hardhat/config/production/contracts';
import { OnQueueActive, OnQueueError, OnQueueStalled, Process, Processor } from '@nestjs/bull';
import { HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AdminWalletService } from '@src/admin-wallet/admin-wallet.service';
import { NftService } from '@src/nft/nft.service';
import { WalletService } from '@src/wallet/wallet.service';
import { Job } from 'bull';
import { Web3Service } from './web3.service';
import { WEB3_QUEUE, Web3QueueActions, SyncJobBody } from './web3.types';

@Processor(WEB3_QUEUE)
export class Web3Consumer {
  private network;

  constructor(
    private readonly web3Service: Web3Service,
    private readonly walletService: WalletService,
    private readonly nftService: NftService,
    private readonly adminWalletService: AdminWalletService,
    private readonly configService: ConfigService,
  ) {
    this.network = this.configService.get('web3Config.network');
  }

  private readonly logger = new Logger(Web3Consumer.name);

  @OnQueueActive()
  onActive(job: Job) {
    this.logger.debug(`Processing job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`);
  }

  @OnQueueStalled()
  onStalled(job: Job) {
    this.logger.debug(`Stalled job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`);
  }

  @OnQueueError()
  onError(job: Job) {
    this.logger.debug(`Processing job failed ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)}...`);
  }

  @Process(Web3QueueActions.Mint)
  async mint(job: Job<SyncJobBody>) {
    const { body } = job.data;

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
      const uniqueId = `${this.network}:${nftContractAddress}:${tokenId}`;

      if (!tokenId) {
        throw new Error(`Empty tokenId received, admin account used: ${adminWallet}`);
      }

      const nft = await this.nftService.save({
        id: body.nftId,
        tokenId: uniqueId,
      });

      if (!nft) {
        throw new Error(`Failed to save nft in the database`);
      }

      this.logger.log(
        `NFT minted, tokenId: ${uniqueId}, ipfsUri: ${body.metadataUri}, admin account used: ${adminWallet}`,
      );
    } catch (err) {
      this.logger.error(err.message);
      await this.nftService.remove(body.nftId);

      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    } finally {
      await this.adminWalletService.setNotInUse(adminWalletId);
    }
  }

  @Process(Web3QueueActions.Transfer)
  async transferToMetamask(job: Job<SyncJobBody>) {
    const { body } = job.data;

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

  @Process(Web3QueueActions.RefillMatic)
  async refillMatic(job: Job<SyncJobBody>) {
    const { address } = job.data.body;

    try {
      await this.web3Service.transferMatic(address, 3);

      await this.adminWalletService.setBalanceEnough(address);

      this.logger.log(`Account "${address}" balance is refilled up to 3 Matics`);
    } catch (err) {
      this.logger.error(err.message);

      throw err;
    }
  }

  @Process(Web3QueueActions.RefillAllAccounts)
  async refillAllAccounts(job: Job<SyncJobBody>) {
    const { addresses } = job.data.body;

    try {
      for (let i = 0; i < addresses.length; i++) {
        await this.web3Service.transferMatic(addresses[i], 0.1);

        await this.adminWalletService.setBalanceEnough(addresses[i]);

        this.logger.log(`Account "${addresses[i]}" balance is refilled up to 3 Matics`);
      }
    } catch (err) {
      this.logger.error(err.message);

      throw err;
    }
  }
}

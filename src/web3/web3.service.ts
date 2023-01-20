import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AbiItem } from 'web3-utils';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Wallet } from './types/wallet.interface';
import { WEB3_PROVIDER_TOKEN } from './web3.types';
import { digikraftNftContractAbi } from './abi/digikraftNftContractAbi';
import { digikraftAdminListContractAbi } from './abi/digikraftAdminListContractAbi';
import { WEB3_QUEUE, Web3QueueActions } from './web3.types';
import { AdminWalletService } from '@src/admin-wallet/admin-wallet.service';

export interface txReturnProps {
  txHash?: string;
  tokenId?: string;
}

@Injectable()
export class Web3Service {
  public digikraftNftContract;
  public digikraftAdminListContract;
  private firstBlockNumber;
  private nftContractAddress;
  private adminListContractAddress;
  private superAdminAccount;

  constructor(
    @Inject(WEB3_PROVIDER_TOKEN) public web3,
    private readonly configService: ConfigService,
    private readonly adminWalletService: AdminWalletService,
    @InjectQueue(WEB3_QUEUE) private web3Queue: Queue,
  ) {
    this.nftContractAddress = configService.get('web3Config.nftContractAddress');
    this.adminListContractAddress = configService.get('web3Config.adminListContractAddress');
    this.superAdminAccount = this.web3.eth.accounts.privateKeyToAccount(
      this.configService.get('web3Config.privateKey'),
    );

    this.digikraftNftContract = new this.web3.eth.Contract(
      digikraftNftContractAbi as AbiItem[],
      this.nftContractAddress,
    );

    this.digikraftAdminListContract = new this.web3.eth.Contract(
      digikraftAdminListContractAbi as AbiItem[],
      this.adminListContractAddress,
    );

    this.web3.eth.getBlockNumber().then((res) => {
      this.firstBlockNumber = res;
    });
  }

  async sendSignedTx(
    contractAddress: string,
    contract: any,
    callerAccount: any,
    func: string,
    params: any,
  ): Promise<txReturnProps> {
    try {
      const txnData = contract.methods[func](...params).encodeABI();

      const estimatedGas = await this.web3.eth.estimateGas({
        to: contractAddress,
        from: callerAccount.address,
        data: txnData,
      });

      const gasPrice = await this.web3.eth.getGasPrice();

      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        {
          to: contractAddress,
          from: callerAccount.address,
          gas: estimatedGas,
          gasPrice,
          data: txnData,
        },
        callerAccount.privateKey,
      );

      let txHash;

      await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).once('transactionHash', (hash) => {
        console.log('txHash:', hash);
        txHash = hash;
      });

      const maticBalance = await this.getMaticBalance(callerAccount.address);
      if (maticBalance < 0.1) {
        // await this.adminWalletService.setBalanceOutOfMatic(callerAccount.address);

        await this.web3Queue.add(Web3QueueActions.RefillMatic, {
          body: { sender: this.superAdminAccount, receiver: callerAccount },
        });
      }

      let tokenId;

      if (func === 'mint' || func === 'transfer') {
        const events = await contract.getPastEvents(
          'Transfer',
          {
            fromBlock: this.firstBlockNumber,
            toBlock: 'latest',
          },
          (err) => {
            if (err) {
              throw new Error('Failed to get events among the given blocks');
            }
          },
        );

        if (!events.length) throw new Error('Failed to get events in the last blocks');

        tokenId = events.filter((event) => event.transactionHash === txHash)[0].returnValues.tokenId;
      }

      this.firstBlockNumber = await this.web3.eth.getBlockNumber();

      return { txHash, tokenId };
    } catch (error) {
      throw error;
    }
  }

  async createWallet(): Promise<Wallet> {
    try {
      const wallet: Wallet = await this.web3.eth.accounts.create();

      return { address: wallet.address, privateKey: wallet.privateKey };
    } catch (error) {
      throw error;
    }
  }

  async getMaticBalance(address: string): Promise<number> {
    try {
      const balance = await this.web3.eth.getBalance(address);

      return balance / 10 ** 18;
    } catch (error) {
      throw error;
    }
  }

  async transferMatic(privateKey: string, from: string, to: string, amount: number): Promise<string> {
    try {
      const gasPrice = await this.web3.eth.getGasPrice();

      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        {
          to,
          from,
          gas: 21000,
          gasPrice,
          value: amount * 10 ** 18,
        },
        privateKey,
      );

      let txHash;

      await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).once('transactionHash', (hash) => {
        console.log('txHash:', hash);
        txHash = hash;
      });

      return txHash;
    } catch (error) {
      throw error;
    }
  }

  async transferNft(operator: string, from: string, to: string, tokenId: number): Promise<string> {
    const adminAccount = this.web3.eth.accounts.privateKeyToAccount(operator);

    const res = await this.sendSignedTx(this.nftContractAddress, this.digikraftNftContract, adminAccount, 'transfer', [
      from,
      to,
      tokenId,
    ]);

    if (!res) {
      throw new Error('Failed to send signed transaction');
    } else if (!res.tokenId || `${tokenId}` !== res.tokenId) {
      throw new Error('Failed to transfer');
    }

    console.log(`'${from}' transferred ticket #${tokenId} to '${to}'`);

    return res.txHash;
  }

  async mint(operator: string, receiver: string, metadataUri: string): Promise<number> {
    const adminAccount = this.web3.eth.accounts.privateKeyToAccount(operator);

    const res = await this.sendSignedTx(this.nftContractAddress, this.digikraftNftContract, adminAccount, 'mint', [
      receiver,
      metadataUri,
    ]);

    if (!res) throw new Error('Failed to send signed transaction');

    return parseInt(res.tokenId);
  }

  async createAdmin(amount: number): Promise<Partial<Wallet>> {
    const wallet: Wallet = await this.web3.eth.accounts.create();

    const res = await this.sendSignedTx(
      this.adminListContractAddress,
      this.digikraftAdminListContract,
      this.superAdminAccount,
      'addAdmin',
      [wallet.address],
    );

    if (!res) throw new Error('Failed to set admin');

    console.log(`Create and grant admin role to "${wallet.address}"`);

    await this.transferMatic(this.superAdminAccount.privateKey, this.superAdminAccount.address, wallet.address, amount);

    console.log(`Sent ${amount} Matic to "${wallet.address}"`);

    return { address: wallet.address, privateKey: wallet.privateKey };
  }

  async removeAdmin(address: string): Promise<string> {
    const res = await this.sendSignedTx(
      this.adminListContractAddress,
      this.digikraftAdminListContract,
      this.superAdminAccount,
      'removeAdmin',
      [address],
    );

    if (!res) throw new Error('Failed to remove admin');

    console.log(`Removed admin role from "${address}"`);

    return res.txHash;
  }
}

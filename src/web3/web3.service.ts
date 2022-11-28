import { Inject, Injectable } from '@nestjs/common';
import { AbiItem } from 'web3-utils';
import { ConfigService } from '@nestjs/config';
import { Wallet } from './types/wallet.interface';
import { WEB3_PROVIDER_TOKEN } from './web3.types';
import { validateNft721ContractAbi } from './abi/validateNft721ContractAbi';

export interface txReturnProps {
  txHash?: string;
  tokenId?: string;
}

@Injectable()
export class Web3Service {
  public validateNft721Contract;
  private nftContractAddress;
  private firstBlockNumber;

  constructor(@Inject(WEB3_PROVIDER_TOKEN) public web3, private readonly configService: ConfigService) {
    this.nftContractAddress = configService.get('web3Config.nftContractAddress');

    this.validateNft721Contract = new this.web3.eth.Contract(
      validateNft721ContractAbi as AbiItem[],
      this.nftContractAddress,
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

      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        {
          to: contractAddress,
          from: callerAccount.address,
          gas: estimatedGas,
          gasPrice: 100000000000,
          data: txnData,
        },
        callerAccount.privateKey,
      );

      let txHash;

      await this.web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).once('transactionHash', (hash) => {
        console.log('txHash:', hash);
        txHash = hash;
      });

      if (func === 'transfer' || func === 'mint' || func === 'burn') {
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

        const tokenId = events.filter((event) => event.transactionHash === txHash)[0].returnValues.tokenId;

        this.firstBlockNumber = await this.web3.eth.getBlockNumber();

        return { txHash, tokenId };
      } else if (func === 'addAdmin') {
        this.firstBlockNumber = await this.web3.eth.getBlockNumber();

        return { txHash };
      }
    } catch (error) {
      throw error;
    }
  }

  async createWallet(): Promise<Partial<Wallet>> {
    try {
      const wallet: Wallet = await this.web3.eth.accounts.create();

      return { address: wallet.address, privateKey: wallet.privateKey };
    } catch (error) {
      throw error;
    }
  }

  async getBalance(address: string): Promise<number> {
    try {
      const balance = await this.web3.eth.getBalance(address);

      return balance;
    } catch (error) {
      throw error;
    }
  }

  async transferMatic(privateKey: string, from: string, to: string, amount: number): Promise<string> {
    try {
      const signedTransaction = await this.web3.eth.accounts.signTransaction(
        {
          to,
          from,
          gas: 21000,
          gasPrice: 50000000000,
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

    const res = await this.sendSignedTx(
      this.nftContractAddress,
      this.validateNft721Contract,
      adminAccount,
      'transfer',
      [from, to, tokenId],
    );

    if (!res) {
      throw new Error('Failed to send signed transaction');
    } else if (!res.tokenId || `${tokenId}` !== res.tokenId) {
      throw new Error('Failed to transfer');
    }

    console.log(`'${from}' transfered ticket #${tokenId} to '${to}'`);

    return res.txHash;
  }
}

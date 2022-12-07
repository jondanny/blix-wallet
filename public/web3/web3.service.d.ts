import { ConfigService } from '@nestjs/config';
import { Wallet } from './types/wallet.interface';
export interface txReturnProps {
    txHash?: string;
    tokenId?: string;
}
export declare class Web3Service {
    web3: any;
    private readonly configService;
    digikraftNftContract: any;
    private nftContractAddress;
    private firstBlockNumber;
    constructor(web3: any, configService: ConfigService);
    sendSignedTx(contractAddress: string, contract: any, callerAccount: any, func: string, params: any): Promise<txReturnProps>;
    createWallet(): Promise<Wallet>;
    getMaticBalance(address: string): Promise<number>;
    transferMatic(privateKey: string, from: string, to: string, amount: number): Promise<string>;
    transferNft(operator: string, from: string, to: string, tokenId: number): Promise<string>;
}

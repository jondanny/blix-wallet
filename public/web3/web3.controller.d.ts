import { Web3Service } from './web3.service';
import { WalletService } from '../wallet/wallet.service';
import { NftTransferDto } from './dto/nft-transfer.dto';
import { MaticTransferDto } from './dto/matic-transfer.dto';
import { Wallet } from '../wallet/wallet.entity';
import { NftService } from 'src/nft/nft.service';
import { WalletCreateDto } from './dto/wallet-create.dto';
export declare class Web3Controller {
    private readonly web3Service;
    private readonly walletService;
    private readonly nftService;
    private readonly logger;
    constructor(web3Service: Web3Service, walletService: WalletService, nftService: NftService);
    createWallet(body: WalletCreateDto): Promise<Wallet>;
    getBalance(address: string): Promise<number>;
    transferMatic(body: MaticTransferDto): Promise<string>;
    transferNft(body: NftTransferDto): Promise<string | void>;
}

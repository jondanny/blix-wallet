import { WalletService } from 'src/wallet/wallet.service';
import { NftCreateDto } from './dto/nft-create.dto';
import { Nft } from './nft.entity';
import { NftService } from './nft.service';
export declare class NftController {
    private readonly nftService;
    private readonly walletService;
    constructor(nftService: NftService, walletService: WalletService);
    findAll(walletAddress: string): Promise<Nft[]>;
    create(body: NftCreateDto): Promise<Nft>;
}

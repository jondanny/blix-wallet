import { NftRepository } from './nft.repository';
export declare class NftService {
    private readonly nftRepository;
    constructor(nftRepository: NftRepository);
    create(walletAddress: string, tokenId: number): Promise<import("./nft.entity").Nft>;
    findOne(id: number): Promise<import("./nft.entity").Nft>;
    findByTokenId(tokenId: number): Promise<import("./nft.entity").Nft>;
    findAllByWalletAddress(walletAddress: string): Promise<import("./nft.entity").Nft[]>;
    transfer(tokenId: number, walletAddress: string): Promise<import("./nft.entity").Nft>;
    remove(id: number): Promise<void>;
}

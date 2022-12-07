"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const nft_repository_1 = require("./nft.repository");
let NftService = class NftService {
    constructor(nftRepository) {
        this.nftRepository = nftRepository;
    }
    async create(walletAddress, tokenId) {
        const nft = await this.nftRepository.create({ walletAddress, tokenId });
        return this.nftRepository.findOneBy({ id: nft.id });
    }
    async findOne(id) {
        return this.nftRepository.findOneBy({ id });
    }
    async findByTokenId(tokenId) {
        return this.nftRepository.findOneBy({ tokenId });
    }
    async findAllByWalletAddress(walletAddress) {
        return this.nftRepository.find({ where: { walletAddress } });
    }
    async transfer(tokenId, walletAddress) {
        console.log('walletAddress:', walletAddress);
        const oldNft = await this.findByTokenId(tokenId);
        await this.nftRepository.update({ tokenId }, Object.assign(Object.assign({}, oldNft), { walletAddress, updatedAt: new Date() }));
        return await this.nftRepository.findOneBy({ tokenId });
    }
    async remove(id) {
        await this.nftRepository.softDelete({ id });
        return;
    }
};
NftService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nft_repository_1.NftRepository])
], NftService);
exports.NftService = NftService;
//# sourceMappingURL=nft.service.js.map
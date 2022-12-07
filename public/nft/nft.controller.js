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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_helper_1 = require("../common/helpers/api-response.helper");
const wallet_service_1 = require("../wallet/wallet.service");
const nft_create_dto_1 = require("./dto/nft-create.dto");
const nft_entity_1 = require("./nft.entity");
const nft_service_1 = require("./nft.service");
let NftController = class NftController {
    constructor(nftService, walletService) {
        this.nftService = nftService;
        this.walletService = walletService;
    }
    async findAll(walletAddress) {
        return this.nftService.findAllByWalletAddress(walletAddress);
    }
    async create(body) {
        const { walletAddress } = await this.walletService.findByUserUuid(body.userUuid);
        return this.nftService.create(walletAddress, body.tokenId);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: `Get all nfts by wallet address` }),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.success(nft_entity_1.Nft)),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: `Add nft and owner info to Nft table when minting` }),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.created(nft_entity_1.Nft)),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nft_create_dto_1.NftCreateDto]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "create", null);
NftController = __decorate([
    (0, common_1.Controller)('nft'),
    __metadata("design:paramtypes", [nft_service_1.NftService, wallet_service_1.WalletService])
], NftController);
exports.NftController = NftController;
//# sourceMappingURL=nft.controller.js.map
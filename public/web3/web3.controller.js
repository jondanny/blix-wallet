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
var Web3Controller_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Controller = void 0;
const common_1 = require("@nestjs/common");
const web3_service_1 = require("./web3.service");
const wallet_service_1 = require("../wallet/wallet.service");
const nft_transfer_dto_1 = require("./dto/nft-transfer.dto");
const matic_transfer_dto_1 = require("./dto/matic-transfer.dto");
const wallet_entity_1 = require("../wallet/wallet.entity");
const nft_service_1 = require("../nft/nft.service");
const wallet_create_dto_1 = require("./dto/wallet-create.dto");
const swagger_1 = require("@nestjs/swagger");
const api_response_helper_1 = require("../common/helpers/api-response.helper");
let Web3Controller = Web3Controller_1 = class Web3Controller {
    constructor(web3Service, walletService, nftService) {
        this.web3Service = web3Service;
        this.walletService = walletService;
        this.nftService = nftService;
        this.logger = new common_1.Logger(Web3Controller_1.name);
    }
    async createWallet(body) {
        try {
            const { address, privateKey } = await this.web3Service.createWallet();
            if (!address || !privateKey) {
                throw new Error('Wallet creation error');
            }
            const wallet = await this.walletService.create({
                userUuid: body.userUuid,
                walletAddress: address,
                privateKey,
            });
            if (!wallet) {
                throw new Error('Wallet saving error');
            }
            this.logger.log(`Wallet created for user ${body.userUuid}: ${wallet.walletAddress}`);
            return wallet;
        }
        catch (err) {
            throw err;
        }
    }
    async getBalance(address) {
        return this.web3Service.getMaticBalance(address);
    }
    async transferMatic(body) {
        try {
            const { walletAddress, privateKey } = await this.walletService.findByUserUuid(body.userUuidFrom);
            const transactionHash = await this.web3Service.transferMatic(privateKey, walletAddress, body.walletAddressTo, body.amount);
            this.logger.log(`Matic transfered, hash: ${transactionHash}`);
            return transactionHash;
        }
        catch (error) {
            throw error;
        }
    }
    async transferNft(body) {
        try {
            const from = await this.walletService.findByUserUuid(body.userUuidFrom);
            if (!from) {
                throw new Error('User in the transfer not found in the database');
            }
            const transactionHash = await this.web3Service.transferNft(from.privateKey, from.walletAddress, body.walletAddressTo, body.tokenId);
            if (!transactionHash) {
                throw new Error(`Transaction hash not found`);
            }
            const nft = await this.nftService.transfer(body.tokenId, body.walletAddressTo);
            if (!nft) {
                throw new Error(`Failed to update database`);
            }
            this.logger.log(`NFT transfered, hash: ${transactionHash}`);
            return transactionHash;
        }
        catch (err) {
            return this.logger.error(err.message);
        }
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: `Create wallet for a user` }),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.created(wallet_entity_1.Wallet)),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)'])),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.Post)('create-wallet'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wallet_create_dto_1.WalletCreateDto]),
    __metadata("design:returntype", Promise)
], Web3Controller.prototype, "createWallet", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: `Get user's Matic balance` }),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.success(Number)),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('balance'),
    __param(0, (0, common_1.Query)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Web3Controller.prototype, "getBalance", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: `Transfer matic to another user` }),
    (0, common_1.Post)('transfer-matic'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [matic_transfer_dto_1.MaticTransferDto]),
    __metadata("design:returntype", Promise)
], Web3Controller.prototype, "transferMatic", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: `Transfer NFT to another user` }),
    (0, common_1.Post)('transfer-nft'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nft_transfer_dto_1.NftTransferDto]),
    __metadata("design:returntype", Promise)
], Web3Controller.prototype, "transferNft", null);
Web3Controller = Web3Controller_1 = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [web3_service_1.Web3Service,
        wallet_service_1.WalletService,
        nft_service_1.NftService])
], Web3Controller);
exports.Web3Controller = Web3Controller;
//# sourceMappingURL=web3.controller.js.map
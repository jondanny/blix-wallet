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
exports.NftTransferDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const wallet_exists_by_user_uuid_validator_1 = require("../../wallet/validators/wallet-exists-by-user-uuid.validator");
const class_validator_1 = require("class-validator");
class NftTransferDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '279c0aba-cb39-4e2b-adf1-f0a9d42652ab', required: true, description: 'Uuid of Nft sender' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(1),
    (0, class_validator_1.MaxLength)(64),
    (0, class_validator_1.Validate)(wallet_exists_by_user_uuid_validator_1.WalletExistsByUserUuidValidator),
    __metadata("design:type", String)
], NftTransferDto.prototype, "userUuidFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0x2DE1918966c679aDF5bcb257bfD8588f011693EE',
        required: true,
        description: 'Wallet address of Nft receiver',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], NftTransferDto.prototype, "walletAddressTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, required: true, description: 'Token id of ERC721 Nft' }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], NftTransferDto.prototype, "tokenId", void 0);
exports.NftTransferDto = NftTransferDto;
//# sourceMappingURL=nft-transfer.dto.js.map
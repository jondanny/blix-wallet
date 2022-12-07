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
exports.TransactionNft = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let TransactionNft = class TransactionNft {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], TransactionNft.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wallet address of Nft sender', maximum: 64 }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], TransactionNft.prototype, "walletAddressFrom", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wallet address of Nft receiver', maximum: 64 }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], TransactionNft.prototype, "walletAddressTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nft Id transfered' }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], TransactionNft.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at date' }),
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], TransactionNft.prototype, "createdAt", void 0);
TransactionNft = __decorate([
    (0, typeorm_1.Entity)('transaction-nft')
], TransactionNft);
exports.TransactionNft = TransactionNft;
//# sourceMappingURL=transaction-nft.entity.js.map
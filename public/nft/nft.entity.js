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
exports.Nft = void 0;
const swagger_1 = require("@nestjs/swagger");
const typeorm_1 = require("typeorm");
let Nft = class Nft {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ name: 'id' }),
    __metadata("design:type", Number)
], Nft.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Wallet address of Nft owner', maximum: 64 }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], Nft.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Token Id of this Nft' }),
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Nft.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Created at date' }),
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], Nft.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Updated at date' }),
    (0, typeorm_1.Column)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], Nft.prototype, "updatedAt", void 0);
Nft = __decorate([
    (0, typeorm_1.Entity)('nft')
], Nft);
exports.Nft = Nft;
//# sourceMappingURL=nft.entity.js.map
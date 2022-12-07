"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionNftModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_nft_service_1 = require("./transaction-nft.service");
const transaction_nft_controller_1 = require("./transaction-nft.controller");
const transaction_nft_repository_1 = require("./transaction-nft.repository");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_nft_entity_1 = require("./transaction-nft.entity");
let TransactionNftModule = class TransactionNftModule {
};
TransactionNftModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transaction_nft_entity_1.TransactionNft])],
        providers: [transaction_nft_service_1.TransactionNftService, transaction_nft_repository_1.TransactionNftRepository],
        controllers: [transaction_nft_controller_1.TransactionNftController],
        exports: [transaction_nft_service_1.TransactionNftService],
    })
], TransactionNftModule);
exports.TransactionNftModule = TransactionNftModule;
//# sourceMappingURL=transaction-nft.module.js.map
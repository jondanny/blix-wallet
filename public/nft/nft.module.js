"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftModule = void 0;
const common_1 = require("@nestjs/common");
const nft_service_1 = require("./nft.service");
const nft_controller_1 = require("./nft.controller");
const wallet_module_1 = require("../wallet/wallet.module");
const typeorm_1 = require("@nestjs/typeorm");
const nft_entity_1 = require("./nft.entity");
const nft_repository_1 = require("./nft.repository");
let NftModule = class NftModule {
};
NftModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([nft_entity_1.Nft]), wallet_module_1.WalletModule],
        providers: [nft_service_1.NftService, nft_repository_1.NftRepository],
        controllers: [nft_controller_1.NftController],
        exports: [nft_service_1.NftService],
    })
], NftModule);
exports.NftModule = NftModule;
//# sourceMappingURL=nft.module.js.map
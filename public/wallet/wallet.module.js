"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const wallet_exists_by_user_uuid_validator_1 = require("./validators/wallet-exists-by-user-uuid.validator");
const wallet_not_exists_by_user_uuid_validator_1 = require("./validators/wallet-not-exists-by-user-uuid.validator");
const wallet_entity_1 = require("./wallet.entity");
const wallet_repository_1 = require("./wallet.repository");
const wallet_service_1 = require("./wallet.service");
let WalletModule = class WalletModule {
};
WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.Wallet])],
        providers: [wallet_service_1.WalletService, wallet_repository_1.WalletRepository, wallet_exists_by_user_uuid_validator_1.WalletExistsByUserUuidValidator, wallet_not_exists_by_user_uuid_validator_1.WalletNotExistsByUserUuidValidator],
        exports: [wallet_service_1.WalletService],
    })
], WalletModule);
exports.WalletModule = WalletModule;
//# sourceMappingURL=wallet.module.js.map
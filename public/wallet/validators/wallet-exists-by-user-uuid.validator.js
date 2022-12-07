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
exports.WalletExistsByUserUuidValidator = void 0;
const class_validator_1 = require("class-validator");
const wallet_service_1 = require("../wallet.service");
let WalletExistsByUserUuidValidator = class WalletExistsByUserUuidValidator {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async validate(uuid, args) {
        const walletExists = await this.walletService.exists(uuid);
        return Boolean(walletExists);
    }
    defaultMessage() {
        return 'Wallet not found';
    }
};
WalletExistsByUserUuidValidator = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'walletExistsByUserUuidValidator', async: true }),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletExistsByUserUuidValidator);
exports.WalletExistsByUserUuidValidator = WalletExistsByUserUuidValidator;
//# sourceMappingURL=wallet-exists-by-user-uuid.validator.js.map
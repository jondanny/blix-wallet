"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionMaticModule = void 0;
const common_1 = require("@nestjs/common");
const transaction_matic_service_1 = require("./transaction-matic.service");
const transaction_matic_controller_1 = require("./transaction-matic.controller");
const transaction_matic_repository_1 = require("./transaction-matic.repository");
const typeorm_1 = require("@nestjs/typeorm");
const transaction_matic_entity_1 = require("./transaction-matic.entity");
let TransactionMaticModule = class TransactionMaticModule {
};
TransactionMaticModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transaction_matic_entity_1.TransactionMatic])],
        providers: [transaction_matic_service_1.TransactionMaticService, transaction_matic_repository_1.TransactionMaticRepository],
        controllers: [transaction_matic_controller_1.TransactionMaticController],
        exports: [transaction_matic_service_1.TransactionMaticService],
    })
], TransactionMaticModule);
exports.TransactionMaticModule = TransactionMaticModule;
//# sourceMappingURL=transaction-matic.module.js.map
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
exports.TransactionMaticController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_helper_1 = require("../common/helpers/api-response.helper");
const find_transaction_matic_dto_1 = require("./dto/find-transaction-matic.dto");
const transaction_matic_entity_1 = require("./transaction-matic.entity");
const transaction_matic_service_1 = require("./transaction-matic.service");
let TransactionMaticController = class TransactionMaticController {
    constructor(transactionMaticService) {
        this.transactionMaticService = transactionMaticService;
    }
    async findAllPaginated(searchParams) {
        return this.transactionMaticService.findAllPaginated(searchParams);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: `Get all transactions by wallet address` }),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.success(transaction_matic_entity_1.TransactionMatic)),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)'])),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_transaction_matic_dto_1.FindTransactionMaticDto]),
    __metadata("design:returntype", Promise)
], TransactionMaticController.prototype, "findAllPaginated", null);
TransactionMaticController = __decorate([
    (0, common_1.Controller)('transaction-matic'),
    __metadata("design:paramtypes", [transaction_matic_service_1.TransactionMaticService])
], TransactionMaticController);
exports.TransactionMaticController = TransactionMaticController;
//# sourceMappingURL=transaction-matic.controller.js.map
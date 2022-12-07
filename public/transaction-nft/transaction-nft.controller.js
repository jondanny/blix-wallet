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
exports.TransactionNftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const api_response_helper_1 = require("../common/helpers/api-response.helper");
const find_transaction_nft_dto_1 = require("./dto/find-transaction-nft.dto");
const transaction_nft_entity_1 = require("./transaction-nft.entity");
const transaction_nft_service_1 = require("./transaction-nft.service");
let TransactionNftController = class TransactionNftController {
    constructor(transactionNftService) {
        this.transactionNftService = transactionNftService;
    }
    async findAllPaginated(searchParams) {
        return this.transactionNftService.findAllPaginated(searchParams);
    }
};
__decorate([
    (0, swagger_1.ApiOperation)({ description: `Get all transactions by wallet address` }),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.success(transaction_nft_entity_1.TransactionNft)),
    (0, swagger_1.ApiResponse)(api_response_helper_1.ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)'])),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_transaction_nft_dto_1.FindTransactionNftDto]),
    __metadata("design:returntype", Promise)
], TransactionNftController.prototype, "findAllPaginated", null);
TransactionNftController = __decorate([
    (0, common_1.Controller)('transaction-nft'),
    __metadata("design:paramtypes", [transaction_nft_service_1.TransactionNftService])
], TransactionNftController);
exports.TransactionNftController = TransactionNftController;
//# sourceMappingURL=transaction-nft.controller.js.map
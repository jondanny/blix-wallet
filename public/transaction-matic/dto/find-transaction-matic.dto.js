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
exports.FindTransactionMaticDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const cursor_filter_dto_1 = require("../../common/pagination/cursor-filter.dto");
const class_transformer_1 = require("class-transformer");
class FindTransactionMaticDto extends cursor_filter_dto_1.CursorFilterDto {
    constructor() {
        super(...arguments);
        this.orderParam = 'createdAt';
        this.limit = 50;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: '8e9c3708-25d8-467f-9a68-00507f8ece4a', required: false }),
    (0, class_validator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], FindTransactionMaticDto.prototype, "walletAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'createdAt', enum: ['createdAt', 'status'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['createdAt']),
    __metadata("design:type", Object)
], FindTransactionMaticDto.prototype, "orderParam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, minimum: 1, maximum: 50, required: false }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(50),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], FindTransactionMaticDto.prototype, "limit", void 0);
exports.FindTransactionMaticDto = FindTransactionMaticDto;
//# sourceMappingURL=find-transaction-matic.dto.js.map
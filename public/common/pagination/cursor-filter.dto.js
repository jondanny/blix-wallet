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
exports.CursorFilterDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class CursorFilterDto {
    constructor(partial) {
        this.limit = 5;
        this.orderParam = 'id';
        this.orderType = 'DESC';
        Object.assign(this, partial);
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Paginates results forward' }),
    (0, class_validator_1.IsBase64)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CursorFilterDto.prototype, "afterCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Paginates results backward' }),
    (0, class_validator_1.IsBase64)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CursorFilterDto.prototype, "beforeCursor", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, minimum: 1, maximum: 50, required: false }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    (0, class_validator_1.Max)(25),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CursorFilterDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'id', enum: ['id'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['id']),
    __metadata("design:type", Object)
], CursorFilterDto.prototype, "orderParam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ASC', enum: ['ASC', 'DESC'], required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsIn)(['ASC', 'DESC']),
    __metadata("design:type", String)
], CursorFilterDto.prototype, "orderType", void 0);
exports.CursorFilterDto = CursorFilterDto;
//# sourceMappingURL=cursor-filter.dto.js.map
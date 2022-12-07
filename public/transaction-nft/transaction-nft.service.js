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
exports.TransactionNftService = void 0;
const common_1 = require("@nestjs/common");
const transaction_nft_repository_1 = require("./transaction-nft.repository");
let TransactionNftService = class TransactionNftService {
    constructor(transactionNftRepository) {
        this.transactionNftRepository = transactionNftRepository;
    }
    async findAllPaginated(searchParams) {
        return this.transactionNftRepository.getPaginatedQueryBuilder(searchParams);
    }
};
TransactionNftService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [transaction_nft_repository_1.TransactionNftRepository])
], TransactionNftService);
exports.TransactionNftService = TransactionNftService;
//# sourceMappingURL=transaction-nft.service.js.map
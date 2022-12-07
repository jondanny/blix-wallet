"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionNftTable1670355050985 = void 0;
const typeorm_1 = require("typeorm");
class CreateTransactionNftTable1670355050985 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'transaction-nft',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    unsigned: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'wallet_address_from',
                    type: 'varchar',
                    length: '66',
                    isNullable: false,
                },
                {
                    name: 'wallet_address_to',
                    type: 'varchar',
                    length: '66',
                    isNullable: false,
                },
                {
                    name: 'token_id',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('transaction-nft');
    }
}
exports.CreateTransactionNftTable1670355050985 = CreateTransactionNftTable1670355050985;
//# sourceMappingURL=1670355050985-CreateTransactionNftTable.js.map
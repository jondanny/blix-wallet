"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTransactionMaticTable1670355060466 = void 0;
const typeorm_1 = require("typeorm");
class CreateTransactionMaticTable1670355060466 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'transaction-matic',
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
                    name: 'amount',
                    type: 'double',
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
        await queryRunner.dropTable('transaction-matic');
    }
}
exports.CreateTransactionMaticTable1670355060466 = CreateTransactionMaticTable1670355060466;
//# sourceMappingURL=1670355060466-CreateTransactionMaticTable.js.map
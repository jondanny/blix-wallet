"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWalletTable1663677085268 = void 0;
const typeorm_1 = require("typeorm");
class CreateWalletTable1663677085268 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'wallet',
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
                    name: 'user_uuid',
                    type: 'varchar',
                    length: '36',
                    isNullable: false,
                },
                {
                    name: 'wallet_address',
                    type: 'varchar',
                    length: '66',
                    isNullable: false,
                },
                {
                    name: 'private_key',
                    type: 'varchar',
                    length: '66',
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    isNullable: true,
                },
                {
                    name: 'deleted_at',
                    type: 'datetime',
                    isNullable: true,
                },
            ],
        }));
        await queryRunner.createIndex('wallet', new typeorm_1.TableIndex({
            name: 'idx_wallet_user_uuid',
            columnNames: ['user_uuid'],
            isUnique: true,
        }));
        await queryRunner.createIndex('wallet', new typeorm_1.TableIndex({
            name: 'idx_wallet_wallet_address',
            columnNames: ['wallet_address'],
            isUnique: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('wallet');
    }
}
exports.CreateWalletTable1663677085268 = CreateWalletTable1663677085268;
//# sourceMappingURL=1663677085268-CreateWalletTable.js.map
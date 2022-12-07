"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateNftTable1670153978704 = void 0;
const typeorm_1 = require("typeorm");
class CreateNftTable1670153978704 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'nft',
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
                    name: 'wallet_address',
                    type: 'varchar',
                    length: '66',
                    isNullable: false,
                },
                {
                    name: 'token_id',
                    type: 'int',
                    unsigned: true,
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
        }), true);
        await queryRunner.createIndex('nft', new typeorm_1.TableIndex({
            name: 'idx_nft_token_id',
            columnNames: ['token_id'],
            isUnique: true,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('nft');
    }
}
exports.CreateNftTable1670153978704 = CreateNftTable1670153978704;
//# sourceMappingURL=1670153978704-CreateNftTable.js.map
import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateWalletTable1663677085268 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );

    await queryRunner.createIndex(
      'wallet',
      new TableIndex({
        name: 'idx_wallet_user_uuid',
        columnNames: ['user_uuid'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'wallet',
      new TableIndex({
        name: 'idx_wallet_wallet_address',
        columnNames: ['wallet_address'],
        isUnique: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('wallet');
  }
}

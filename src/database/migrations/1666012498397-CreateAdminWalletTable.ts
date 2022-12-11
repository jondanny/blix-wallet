import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateAdminWalletTable1666012498397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'admin_wallet',
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
            length: '64',
            isNullable: false,
          },
          {
            name: 'private_key',
            type: 'varchar',
            length: '64',
            isNullable: false,
          },
          {
            name: 'in_use',
            type: 'tinyint',
            length: '1',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admin_wallet');
  }
}

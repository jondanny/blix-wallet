import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactionNftTable1670355050985 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transaction-nft');
  }
}

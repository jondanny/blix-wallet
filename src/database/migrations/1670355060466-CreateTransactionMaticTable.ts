import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTransactionMaticTable1670355060466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transaction-matic');
  }
}

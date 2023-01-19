import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddBalanceStatusField1674163908863 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'admin_wallet',
      new TableColumn({
        name: 'balance',
        type: 'tinyint',
        length: '1',
        default: 0,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}

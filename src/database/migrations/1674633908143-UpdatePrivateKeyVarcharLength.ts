import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class UpdatePrivateKeyVarcharLength1674633908143 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('wallet', 'private_key');
    await queryRunner.addColumn(
      'wallet',
      new TableColumn({
        name: 'private_key',
        type: 'varchar',
        length: '256',
        isNullable: true,
      }),
    );

    await queryRunner.dropColumn('admin_wallet', 'private_key');
    await queryRunner.addColumn(
      'admin_wallet',
      new TableColumn({
        name: 'private_key',
        type: 'varchar',
        length: '256',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}

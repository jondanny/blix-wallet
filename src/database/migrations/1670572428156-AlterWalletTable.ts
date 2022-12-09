import { WalletType } from '@src/wallet/wallet.types';
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterWalletTable1670572428156 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('wallet', 'private_key');
    await queryRunner.addColumn(
      'wallet',
      new TableColumn({
        name: 'private_key',
        type: 'varchar',
        length: '66',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'wallet',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: Object.values(WalletType),
        default: `'${WalletType.Blix}'`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('wallet', ['private_key, type']);
    await queryRunner.addColumn(
      'wallet',
      new TableColumn({
        name: 'private_key',
        type: 'varchar',
        length: '66',
        isNullable: false,
      }),
    );
  }
}

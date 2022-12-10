import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { WalletType } from '@src/wallet/wallet.types';

export class AlterNftTable1670623624937 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('nft', 'wallet_address');
    await queryRunner.addColumn(
      'nft',
      new TableColumn({
        name: 'user_uuid',
        type: 'varchar',
        length: '36',
        isNullable: false,
      }),
    );
    await queryRunner.addColumn(
      'nft',
      new TableColumn({
        name: 'wallet_type',
        type: 'enum',
        enum: Object.values(WalletType),
        default: `'${WalletType.Blix}'`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns('nft', ['user_uuid', 'type']);
    await queryRunner.addColumn(
      'nft',
      new TableColumn({
        name: 'wallet_address',
        type: 'varchar',
        length: '66',
        isNullable: false,
      }),
    );
  }
}

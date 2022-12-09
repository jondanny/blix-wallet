import { MigrationInterface, QueryRunner, TableIndex } from 'typeorm';

export class DeleteUserUuidIndex1670580771467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('wallet', 'idx_wallet_user_uuid');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createIndex(
      'wallet',
      new TableIndex({
        name: 'idx_wallet_user_uuid',
        columnNames: ['user_uuid'],
        isUnique: true,
      }),
    );
  }
}

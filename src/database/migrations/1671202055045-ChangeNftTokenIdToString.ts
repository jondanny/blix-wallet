import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class ChangeNftTokenIdToString1671202055045 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('nft', 'token_id');
    await queryRunner.addColumn(
      'nft',
      new TableColumn({
        name: 'token_id',
        type: 'varchar',
        length: '64',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}

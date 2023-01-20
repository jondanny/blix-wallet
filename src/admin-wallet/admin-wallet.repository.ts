import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AdminWallet } from './admin-wallet.entity';
import { AdminWalletUsage, BalanceStatus } from './admin-wallet.types';

@Injectable()
export class AdminWalletRepository extends Repository<AdminWallet> {
  constructor(private readonly dataSource: DataSource) {
    super(AdminWallet, dataSource.manager);
  }

  async findFreeEnoughAndSetInUse() {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const adminWallet = await queryRunner.manager
        .createQueryBuilder(AdminWallet, 'admin_wallet')
        .setLock('pessimistic_write')
        .where({ inUse: AdminWalletUsage.NotInUse })
        // .where({ inUse: AdminWalletUsage.NotInUse, balance: BalanceStatus.Enough })
        .orderBy('RAND()')
        .getOne();

      if (!adminWallet) {
        throw new Error('No free admin wallets left');
      }

      await queryRunner.manager
        .createQueryBuilder()
        .update(AdminWallet)
        .where({ id: adminWallet.id })
        .set({ inUse: AdminWalletUsage.InUse })
        .execute();

      await queryRunner.commitTransaction();

      return this.findOne({ where: { id: adminWallet.id } });
    } catch (err) {
      await queryRunner.rollbackTransaction();

      throw new Error(`Error getting free admin wallet: ${err.message}`);
    } finally {
      await queryRunner.release();
    }
  }
}

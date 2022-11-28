import { faker } from '@faker-js/faker';
import { AppDataSource } from '../../config/datasource';
import { AdminWallet } from '../../admin-wallet/admin-wallet.entity';

export class AdminWalletFactory {
  static async create(data?: Partial<AdminWallet>) {
    const adminWallet = new AdminWallet();

    adminWallet.walletAddress = faker.finance.ethereumAddress();
    adminWallet.privateKey = faker.datatype.string(64);
    adminWallet.inUse = 0;

    return AppDataSource.manager.getRepository(AdminWallet).save({ ...adminWallet, ...data });
  }

  static async getAdmin() {
    const adminWallet = new AdminWallet();

    adminWallet.walletAddress = '0x37177B55297590f40E81114449c0B72504657E5E';
    adminWallet.privateKey = '651158d669375864eacde52926b13ac7ba2780d467067dad8f8f897591c65029';
    adminWallet.inUse = 0;

    return AppDataSource.manager.getRepository(AdminWallet).save({ ...adminWallet });
  }
}

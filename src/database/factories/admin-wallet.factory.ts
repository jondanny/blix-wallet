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

    adminWallet.walletAddress = '0x077A09B5D3aFd37644e07A29eEDf5c12F3F8bef7';
    adminWallet.privateKey = 'f3da0775fda85c722d85b930075e38f6ec7ead4be5cb2287d92824689a55d035';
    adminWallet.inUse = 0;

    return AppDataSource.manager.getRepository(AdminWallet).save({ ...adminWallet });
  }
}

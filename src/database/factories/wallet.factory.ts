import { faker } from '@faker-js/faker';
import { WalletType } from '@src/wallet/wallet.types';
import { AppDataSource } from '@src/config/datasource';
import { Wallet } from '@src/wallet/wallet.entity';

export class WalletFactory {
  static async createBlix(data?: Partial<Wallet>) {
    const wallet = new Wallet();

    wallet.userUuid = faker.datatype.string(30);
    wallet.walletAddress = faker.finance.ethereumAddress();
    wallet.privateKey = faker.datatype.string(64);
    wallet.type = WalletType.Blix;

    return AppDataSource.manager.getRepository(Wallet).save({ ...wallet, ...data });
  }

  static async createMetamask(data?: Partial<Wallet>) {
    const wallet = new Wallet();

    wallet.userUuid = faker.datatype.string(30);
    wallet.walletAddress = faker.finance.ethereumAddress();
    wallet.type = WalletType.Metamask;

    return AppDataSource.manager.getRepository(Wallet).save({ ...wallet, ...data });
  }
}

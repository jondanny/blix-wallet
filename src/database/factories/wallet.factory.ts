import { faker } from '@faker-js/faker';
import { AppDataSource } from '../../config/datasource';
import { Wallet } from '../../wallet/wallet.entity';

export class WalletFactory {
  static async create(data?: Partial<Wallet>) {
    const wallet = new Wallet();

    wallet.userUuid = faker.datatype.uuid();
    wallet.walletAddress = faker.finance.ethereumAddress();
    wallet.privateKey = faker.datatype.string(64);

    return AppDataSource.manager.getRepository(Wallet).save({ ...wallet, ...data });
  }
}

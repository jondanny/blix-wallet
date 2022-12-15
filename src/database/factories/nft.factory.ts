import { faker } from '@faker-js/faker';
import { WalletType } from '@src/wallet/wallet.types';
import { AppDataSource } from '@src/config/datasource';
import { Nft } from '@src/nft/nft.entity';

export class NftFactory {
  static async mintToBlixWallet(data?: Partial<Nft>) {
    const nft = new Nft();

    nft.tokenId = faker.datatype.number();
    nft.userUuid = faker.datatype.uuid();
    nft.walletType = WalletType.Blix;

    return AppDataSource.manager.getRepository(Nft).save({ ...nft, ...data });
  }
}

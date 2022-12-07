"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletFactory = void 0;
const faker_1 = require("@faker-js/faker");
const datasource_1 = require("../../config/datasource");
const wallet_entity_1 = require("../../wallet/wallet.entity");
class WalletFactory {
    static async create(data) {
        const wallet = new wallet_entity_1.Wallet();
        wallet.userUuid = faker_1.faker.datatype.uuid();
        wallet.walletAddress = faker_1.faker.finance.ethereumAddress();
        wallet.privateKey = faker_1.faker.datatype.string(64);
        return datasource_1.AppDataSource.manager.getRepository(wallet_entity_1.Wallet).save(Object.assign(Object.assign({}, wallet), data));
    }
}
exports.WalletFactory = WalletFactory;
//# sourceMappingURL=wallet.factory.js.map
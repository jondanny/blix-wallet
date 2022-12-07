"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Provider = void 0;
const alchemy_web3_1 = require("@alch/alchemy-web3");
const config_1 = require("@nestjs/config");
const web3_types_1 = require("./web3.types");
exports.Web3Provider = {
    provide: web3_types_1.WEB3_PROVIDER_TOKEN,
    useFactory: async (configService) => (0, alchemy_web3_1.createAlchemyWeb3)(alchemyUrl(configService.get('web3Config.testnetApiUrl'), configService.get('web3Config.alchemyApiKey')), {
        writeProvider: null,
    }),
    inject: [config_1.ConfigService],
};
const alchemyUrl = (baseUrl, apiKey) => `${baseUrl}${apiKey}`;
//# sourceMappingURL=web3.provider.js.map
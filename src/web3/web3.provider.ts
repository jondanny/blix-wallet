import { createAlchemyWeb3, AlchemyWeb3 } from '@alch/alchemy-web3';
import { ConfigService } from '@nestjs/config';
import { WEB3_PROVIDER_TOKEN } from './web3.types';

export const Web3Provider = {
  provide: WEB3_PROVIDER_TOKEN,
  useFactory: async (configService: ConfigService): Promise<AlchemyWeb3> =>
    createAlchemyWeb3(
      alchemyUrl(configService.get('web3Config.testnetApiUrl'), configService.get('web3Config.alchemyApiKey')),
      {
        writeProvider: null,
      },
    ),
  inject: [ConfigService],
};

const alchemyUrl = (baseUrl: string, apiKey: string) => `${baseUrl}${apiKey}`;

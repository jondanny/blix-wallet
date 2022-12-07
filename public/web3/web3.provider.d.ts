import { AlchemyWeb3 } from '@alch/alchemy-web3';
import { ConfigService } from '@nestjs/config';
export declare const Web3Provider: {
    provide: string;
    useFactory: (configService: ConfigService) => Promise<AlchemyWeb3>;
    inject: (typeof ConfigService)[];
};

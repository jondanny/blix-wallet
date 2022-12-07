export declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
declare class EnvironmentVariables {
    NODE_ENV: Environment;
    TYPEORM_HOST: string;
    TYPEORM_PORT: number;
    TYPEORM_PASSWORD: string;
    TYPEORM_DATABASE: string;
    TYPEORM_USERNAME: string;
    TYPEORM_CONNECTION: string;
    TYPEORM_MIGRATIONS: string;
    TYPEORM_MIGRATIONS_DIR: string;
    TYPEORM_LOGGING: string;
    TYPEORM_POOL_SIZE: number;
    MYSQL_TLS: string;
    TESTNET_API_URL: string;
    ALCHEMY_API_KEY: string;
    NFT_CONTRACT_ADDRESS: string;
    PRIVATE_KEY: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const path = require("path");
const dotenv = require("dotenv");
const env_helper_1 = require("../common/helpers/env.helper");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
dotenv.config({ path: env_helper_1.EnvHelper.getEnvFilePath() });
console.log(path.join(__dirname, '../database/migrations/*{.ts,.js'));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    entities: [path.join(__dirname, '../**/*.entity{.ts,.js}')],
    subscribers: [path.join(__dirname, '../**/*.subscriber{.ts,.js}')],
    synchronize: false,
    logging: process.env.TYPEORM_LOGGING === 'true',
    migrations: [path.join(__dirname, '../database/migrations/*')],
    charset: 'utf8mb4_unicode_ci',
    legacySpatialSupport: false,
    extra: {
        connectionLimit: process.env.MYSQL_CONNECTION_LIMIT || 200,
        waitForConnections: process.env.MYSQL_WAIT_FOR_CONNECTIONS === 'true',
    },
    poolSize: Number(process.env.TYPEORM_POOL_SIZE),
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
    ssl: { rejectUnauthorized: process.env.MYSQL_TLS === 'true' },
});
//# sourceMappingURL=datasource.js.map
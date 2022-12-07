import { DataSource, Repository } from 'typeorm';
import { Wallet } from './wallet.entity';
export declare class WalletRepository extends Repository<Wallet> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    exists(userUuid: string): Promise<boolean>;
}

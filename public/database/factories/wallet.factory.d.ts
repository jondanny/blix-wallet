import { Wallet } from '../../wallet/wallet.entity';
export declare class WalletFactory {
    static create(data?: Partial<Wallet>): Promise<{
        id: number;
        userUuid: string;
        walletAddress: string;
        privateKey: string;
        createdAt: Date;
        updatedAt: Date;
        deletedAt?: Date;
    } & Wallet>;
}

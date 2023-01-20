import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { AdminWalletUsage, BalanceStatus } from './admin-wallet.types';

@Entity('admin_wallet')
export class AdminWallet {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false, length: 100 })
  walletAddress: string;

  @Column({ nullable: false, length: 100 })
  privateKey: string;

  @Column({ nullable: false })
  inUse: AdminWalletUsage;

  @Column({ nullable: false })
  balance: BalanceStatus;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;
}

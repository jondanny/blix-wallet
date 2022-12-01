import { Wallet } from 'src/wallet/wallet.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity('nft')
export class Nft {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: true })
  walletAddress: string;

  @Column({ nullable: false })
  tokenId: number;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ManyToOne(() => Wallet, (wallet) => wallet.nfts)
  wallet: Wallet;
}

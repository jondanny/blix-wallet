import { Nft } from 'src/nft/nft.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, OneToMany } from 'typeorm';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false, length: 100 })
  userUuid: string;

  @Column({ nullable: false, length: 100 })
  walletAddress: string;

  @Column({ nullable: false, length: 100 })
  privateKey: string;

  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @Column({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;

  @OneToMany(() => Nft, (nft) => nft.wallet)
  nfts: Nft[];
}

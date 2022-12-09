import { ApiProperty } from '@nestjs/swagger';
import { Nft } from '@src/nft/nft.entity';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { WalletType } from './wallet.types';

@Entity('wallet')
export class Wallet {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'User unique uuid', maximum: 36 })
  @Column({ nullable: false, length: 100 })
  userUuid: string;

  @ApiProperty({ description: `User's wallet address`, maximum: 64 })
  @Column({ nullable: false, length: 100 })
  walletAddress: string;

  @ApiProperty({ description: `Wallet private key`, maximum: 66 })
  @Column({ nullable: true, length: 100 })
  privateKey: string;

  @ApiProperty({ description: `Wallet type (Blix or Metamask)` })
  @Column({ nullable: false })
  type: WalletType;

  @ApiProperty({ description: 'Created at date' })
  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at date' })
  @Column({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Deleted at date' })
  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt?: Date;

  @ApiProperty({ type: () => Nft })
  @OneToMany(() => Nft, (nft) => nft.wallet)
  @JoinColumn({ name: 'wallet_address', referencedColumnName: 'walletAddress' })
  nfts: Nft[];
}

import { ApiProperty } from '@nestjs/swagger';
import { Wallet } from '@src/wallet/wallet.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('nft')
export class Nft {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'Wallet address of Nft owner', maximum: 64 })
  @Column({ nullable: false })
  walletAddress: string;

  @ApiProperty({ description: 'Token Id of this Nft' })
  @Column({ nullable: false })
  tokenId: number;

  @ApiProperty({ description: 'Created at date' })
  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at date' })
  @Column({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ApiProperty({ type: () => Wallet })
  @ManyToOne(() => Wallet, (wallet) => wallet.nfts)
  @JoinColumn({ name: 'wallet_address', referencedColumnName: 'walletAddress' })
  wallet: Wallet;
}

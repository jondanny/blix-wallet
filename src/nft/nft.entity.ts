import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';
import { WalletType } from '@src/wallet/wallet.types';

@Entity('nft')
export class Nft {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'Token Id of this Nft' })
  @Column({ nullable: false, length: 64, unique: true })
  tokenId: string;

  @ApiProperty({ description: 'User unique uuid', maximum: 36 })
  @Column({ nullable: false, length: 100 })
  userUuid: string;

  @ApiProperty({ description: `Wallet type (Blix or Metamask)` })
  @Column({ nullable: false })
  walletType: WalletType;

  @ApiProperty({ description: 'Created at date' })
  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;

  @ApiProperty({ description: 'Updated at date' })
  @Column({ type: 'datetime', nullable: false })
  updatedAt: Date;

  @ApiProperty({ description: 'Deleted at date' })
  @DeleteDateColumn({ type: 'datetime', nullable: true })
  deletedAt: Date;
}

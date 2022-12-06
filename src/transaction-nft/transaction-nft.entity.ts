import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction-nft')
export class TransactionNft {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'Wallet address of Nft sender', maximum: 64 })
  @Column({ nullable: false })
  walletAddressFrom: string;

  @ApiProperty({ description: 'Wallet address of Nft receiver', maximum: 64 })
  @Column({ nullable: false })
  walletAddressTo: string;

  @ApiProperty({ description: 'Nft Id transfered' })
  @Column({ nullable: false })
  tokenId: number;

  @ApiProperty({ description: 'Created at date' })
  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}

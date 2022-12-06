import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transaction-matic')
export class TransactionMatic {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: 'Wallet address of Matic sender', maximum: 64 })
  @Column({ nullable: false })
  walletAddressFrom: string;

  @ApiProperty({ description: 'Wallet address of Matic receiver', maximum: 64 })
  @Column({ nullable: false })
  walletAddressTo: string;

  @ApiProperty({ description: 'Matic amount transfered' })
  @Column({ nullable: false })
  amount: number;

  @ApiProperty({ description: 'Created at date' })
  @Column({ type: 'datetime', nullable: false })
  createdAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 5, required: true, description: 'Matic amount to be transferred to new admin account' })
  @IsNumber()
  amount: number;
}

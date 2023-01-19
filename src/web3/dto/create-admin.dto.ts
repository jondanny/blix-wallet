import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({ example: 'password', required: true, description: 'Password for admin authentication' })
  @IsString()
  password: string;

  @ApiProperty({ example: 5, required: true, description: 'Matic amount to be transferred to new admin account' })
  @IsNumber()
  amount: number;
}

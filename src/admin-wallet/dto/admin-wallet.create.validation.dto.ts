import { IsNotEmpty, IsString } from 'class-validator';

export class AdminWalletCreateValidationDto {
  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  privateKey: string;
}

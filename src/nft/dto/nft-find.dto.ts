import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class NftFindDto {
  @ApiProperty({
    example: 'RIQU3JFD2YM2LDxvxGHBNtfKDw12',
    required: true,
    description: 'Uuid of new wallet owner',
  })
  @IsString()
  @MinLength(1)
  @MaxLength(32)
  userUuid: string;
}

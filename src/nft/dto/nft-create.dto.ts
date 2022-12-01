import { IsInt, IsString } from 'class-validator';

export class NftCreateDto {
  @IsString()
  userUuid: string;

  @IsInt()
  tokenId: number;
}

import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';
import { NftFindDto } from './dto/nft-find.dto';
import { Nft } from './nft.entity';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) {}

  @ApiOperation({ description: `Get all nfts by userUuid` })
  @ApiResponse(ApiResponseHelper.success(Nft))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.OK)
  @Get()
  async findAllByUserUuid(@Query() params: NftFindDto) {
    return this.nftService.findAllByUserUuid(params.userUuid);
  }
}

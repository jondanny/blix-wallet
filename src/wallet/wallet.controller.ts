import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Logger,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiResponseHelper } from '@src/common/helpers/api-response.helper';
import { AddMetamaskValidationDto } from '@src/wallet/dto/add-metamask.validation.dto';
import { Wallet } from './wallet.entity';
import { WalletService } from './wallet.service';
import { WalletType } from './wallet.types';

@Controller()
export class WalletController {
  private readonly logger = new Logger(WalletController.name);

  constructor(private readonly walletService: WalletService) {}

  @ApiOperation({ description: `Add metamask wallet to user account` })
  @ApiResponse(ApiResponseHelper.created(Wallet))
  @ApiResponse(ApiResponseHelper.validationErrors(['Validation failed (uuid is expected)']))
  @UseInterceptors(ClassSerializerInterceptor)
  @HttpCode(HttpStatus.CREATED)
  @Post('add-metamask')
  async addMetamaskWallet(@Body() body: AddMetamaskValidationDto): Promise<Wallet> {
    try {
      const wallet: Wallet = await this.walletService.create({
        ...body,
        type: WalletType.Metamask,
      });

      if (!wallet) {
        throw new HttpException(`Failed to store wallet information in database`, HttpStatus.INTERNAL_SERVER_ERROR);
      }

      this.logger.log(`Metamask wallet added for user ${body.userUuid}: ${wallet.walletAddress}`);

      return wallet;
    } catch (error) {
      throw error;
    }
  }

  @Post('wallet/encrypt')
  async encryptPrivateKeys() {
    return this.walletService.encryptPrivateKeys();
  }
}

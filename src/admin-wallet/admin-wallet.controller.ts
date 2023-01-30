import { Controller, Logger, Post } from '@nestjs/common';
import { AdminWalletService } from './admin-wallet.service';

@Controller()
export class AdminWalletController {
  private readonly logger = new Logger(AdminWalletController.name);

  constructor(private readonly adminWalletService: AdminWalletService) {}

  @Post('admin-wallet/encrypt')
  async encryptPrivateKeys() {
    return this.adminWalletService.encryptPrivateKeys();
  }
}

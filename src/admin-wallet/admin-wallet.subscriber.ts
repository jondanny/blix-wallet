import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { AdminWallet } from './admin-wallet.entity';
import { encrypt, decrypt } from '@src/common/utils/cipher';

@EventSubscriber()
export class AdminWalletSubscriber implements EntitySubscriberInterface<AdminWallet> {
  listenTo(): any {
    return AdminWallet;
  }

  async beforeInsert(event: InsertEvent<AdminWallet>) {
    event.entity.privateKey = encrypt(event.entity.privateKey);
  }

  async beforeUpdate(event: UpdateEvent<AdminWallet>) {
    event.entity.privateKey = encrypt(event.entity.privateKey);
  }

  async beforeRemove(event: RemoveEvent<AdminWallet>) {
    event.entity.privateKey = encrypt(event.entity.privateKey);
  }

  async afterLoad(entity: AdminWallet): Promise<void> {
    entity.privateKey = decrypt(entity.privateKey);
  }
}

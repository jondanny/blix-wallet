import { EventSubscriber, EntitySubscriberInterface, InsertEvent, UpdateEvent, RemoveEvent } from 'typeorm';
import { Wallet } from './wallet.entity';
import { encrypt, decrypt } from '@src/common/utils/cipher';

@EventSubscriber()
export class WalletSubscriber implements EntitySubscriberInterface<Wallet> {
  listenTo(): any {
    return Wallet;
  }

  async beforeInsert(event: InsertEvent<Wallet>) {
    event.entity.privateKey = encrypt(event.entity.privateKey);
  }

  async beforeUpdate(event: UpdateEvent<Wallet>) {
    event.entity.privateKey = encrypt(event.entity.privateKey);
  }

  async beforeRemove(event: RemoveEvent<Wallet>) {
    event.entity.privateKey = encrypt(event.entity.privateKey);
  }

  async afterLoad(entity: Wallet): Promise<void> {
    entity.privateKey = decrypt(entity.privateKey);
  }
}

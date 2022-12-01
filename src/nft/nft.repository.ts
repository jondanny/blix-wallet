import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Nft } from './nft.entity';

@Injectable()
export class NftRepository extends Repository<Nft> {
  constructor(private readonly dataSource: DataSource) {
    super(Nft, dataSource.manager);
  }
}

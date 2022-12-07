import { DataSource, Repository } from 'typeorm';
import { Nft } from './nft.entity';
export declare class NftRepository extends Repository<Nft> {
    private readonly dataSource;
    constructor(dataSource: DataSource);
}

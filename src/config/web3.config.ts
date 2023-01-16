import { registerAs } from '@nestjs/config';
import {
  nftContractAddress as devNftContractAddress,
  adminListContractAddress as devAdminListContractAddress,
} from '@hardhat/config/development/contracts';
import {
  nftContractAddress as prodNftContractAddress,
  adminListContractAddress as prodAdminListContractAddress,
} from '@hardhat/config/production/contracts';

export default registerAs('web3Config', () => ({
  providerUrl: process.env.PROVIDER_URL,
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
  nftContractAddress: process.env.NODE_ENV === 'development' ? devNftContractAddress : prodNftContractAddress,
  adminListContractAddress:
    process.env.NODE_ENV === 'development' ? devAdminListContractAddress : prodAdminListContractAddress,
  privateKey: process.env.PRIVATE_KEY,
  biconomyApiKey: process.env.BICONOMY_API_KEY,
  nftStorageApiKey: process.env.NFT_STORAGE_API_KEY,
  network: process.env.NETWORK,
}));

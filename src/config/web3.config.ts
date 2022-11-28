import { registerAs } from '@nestjs/config';

export default registerAs('web3Config', () => ({
  testnetApiUrl: process.env.TESTNET_API_URL,
  alchemyApiKey: process.env.ALCHEMY_API_KEY,
  nftContractAddress: process.env.NFT_CONTRACT_ADDRESS,
  adminListContractAddress: process.env.ADMIN_LIST_CONTRACT_ADDRESS,
  privateKey: process.env.PRIVATE_KEY,
  biconomyApiKey: process.env.BICONOMY_API_KEY,
  nftStorageApiKey: process.env.NFT_STORAGE_API_KEY,
}));

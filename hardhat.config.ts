import { HardhatUserConfig } from 'hardhat/types';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@nomicfoundation/hardhat-toolbox';
import '@typechain/hardhat';
import * as dotenv from 'dotenv';

dotenv.config({ path: './.env.development' });

const { POLYGONSCAN_API_KEY, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: '0.8.9',
  defaultNetwork: 'mumbai_testnet',
  networks: {
    hardhat: {},
    mumbai_testnet: {
      url: 'https://rpc-mumbai.maticvigil.com',
      accounts: [PRIVATE_KEY],
    },
    polygon_mainnet: {
      url: 'https://polygon-rpc.com',
      accounts: [PRIVATE_KEY],
    },
    bsc_testnet: {
      url: 'https://data-seed-prebsc-1-s1.binance.org:8545',
      accounts: [PRIVATE_KEY],
    },
    bsc_mainnet: {
      url: 'https://bsc-dataseed.binance.org/',
      accounts: [PRIVATE_KEY],
    },
    goerli_testnet: {
      url: 'http://goerli.prylabs.net/',
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: POLYGONSCAN_API_KEY,
  },
  paths: {
    root: './hardhat',
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;

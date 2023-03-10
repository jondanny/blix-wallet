import { ethers } from 'hardhat';
import writeConfig from '../utils/write-config';
import { adminListContractAddress } from '../config/production/contracts';

async function main() {
  const DigikraftNft = await ethers.getContractFactory('DigikraftNft');
  const digikraftNft = await DigikraftNft.deploy(adminListContractAddress);
  await digikraftNft.deployed();

  writeConfig('nftContractAddress', digikraftNft.address);

  console.log('DigikraftNft deployed to:', digikraftNft.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

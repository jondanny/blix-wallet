import { ethers } from 'hardhat';
import writeConfig from '../utils/write-config';

async function main() {
  const DigikraftAdminList = await ethers.getContractFactory('DigikraftAdminList');
  const digikraftAdminList = await DigikraftAdminList.deploy();
  await digikraftAdminList.deployed();

  writeConfig('adminListContractAddress', digikraftAdminList.address);

  console.log('DigikraftAdminList deployed to:', digikraftAdminList.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

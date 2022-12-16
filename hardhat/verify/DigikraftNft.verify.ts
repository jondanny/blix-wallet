import { run } from 'hardhat';

import { nftContractAddress, adminListContractAddress } from '../config/contracts';

async function main() {
  await run('verify:verify', {
    address: nftContractAddress,
    constructorArguments: [adminListContractAddress],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

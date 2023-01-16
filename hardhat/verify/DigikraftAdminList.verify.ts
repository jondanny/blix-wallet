import { run } from 'hardhat';

import { adminListContractAddress } from '../config/production/contracts';

async function main() {
  await run('verify:verify', {
    address: adminListContractAddress,
    constructorArguments: [],
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

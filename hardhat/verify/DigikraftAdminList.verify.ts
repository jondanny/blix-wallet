import { run } from 'hardhat';

import { adminListContractAddress } from '../config/contracts';

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

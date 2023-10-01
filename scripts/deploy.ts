import { ethers } from "hardhat";

async function main() {
  const accounts = await ethers.getSigners();
  const signer = accounts[0];

  const AVALANCHE_ROUTER = '0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8';
  const AVALANCHE_LINK = '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846';

  const OP_DEST_CHAIN = BigInt(2664363617261496610);

  const senderAvalanche = await ethers.deployContract("Sender", [AVALANCHE_ROUTER, AVALANCHE_LINK], signer);

  await senderAvalanche.waitForDeployment();

  console.log(`Deployed ccip sender with owner address : ${JSON.stringify(signer)} deployed to ${senderAvalanche.target}`);

  await senderAvalanche.whitelistChain(OP_DEST_CHAIN);

  console.log(`Whitelisted ${OP_DEST_CHAIN} chain for CCIP transfers`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

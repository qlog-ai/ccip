import { ethers } from "hardhat";
import { abi } from '../abi.json';

async function main() {
    const accounts = await ethers.getSigners();
    const signer = accounts[0];

    const SENDER_CONTRACT_ADDRESS = '0x50d00480D383Fd9846fe4419C0288c469DbdCd8E';
  
    const OP_DEST_CHAIN = '2664363617261496610'
    const RECEIVER_CONTRACT = '0xB468157d7AA547BE40E17945D3f443f5AF455ed2';
    const CCIP_BNM_TOKEN = '0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4';
    const AMOUNT_TO_SEND = '100';
  
    const senderAvalanche = new ethers.Contract(SENDER_CONTRACT_ADDRESS, abi, signer);

    console.log(JSON.stringify(senderAvalanche));

    const response = await senderAvalanche.transferTokensPayLINK(
        OP_DEST_CHAIN,
        RECEIVER_CONTRACT,
        CCIP_BNM_TOKEN,
        AMOUNT_TO_SEND
    )

    console.log('finished sending to CCIP')

    console.log(JSON.stringify(response));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
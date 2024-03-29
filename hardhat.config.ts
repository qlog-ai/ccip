import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { rpcUrl } from './secrets.json';
import { privateKey } from './secrets.json';
import { ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {JsonRpcProvider} from "@ethersproject/providers";
import { Wallet } from "ethers";
import { abi } from './abi.json';

const AVALANCHE_LINK = '0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846';
const OP_DEST_CHAIN = BigInt(2664363617261496610);//'2664363617261496610'; //
const RECEIVER = '0xE73107c9a4B8Db993EAeBA6c67Eb44A1f746a93D';
const amount = BigInt(1000000000000000);
const CCIP_BNM = '0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4';

task("send", "Send CCIP message to dest chain")
.addPositionalParam('contract', 'deployed contract address')
.setAction(async (args : any, hre: any) => {
  
  const uwProvider = new JsonRpcProvider(rpcUrl);
  const sender = await hre.ethers.getContractAt("Sender", args.contract, new hre.ethers.Wallet(privateKey, uwProvider));
  //console.log(JSON.stringify(sender))

  let response;
  //console.log(OP_DEST_CHAIN);
  try{
      response = await sender.transferTokensPayLINK(
      OP_DEST_CHAIN,
      //"2664363617261496610",
      RECEIVER,
      CCIP_BNM,
      10
    )
  }catch(e){
    console.log(e);
  }
  

  console.log(`Successfully transferred tokens cross chain!! ${JSON.stringify(response)}`);
});

task("send-avalanche", "Send CCIP message to dest chain")
.addPositionalParam('contract', 'deployed contract address')
.setAction(async (args : any, hre: any) => {
  const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];

    const SENDER_CONTRACT_ADDRESS = args.contract;//'0x50d00480D383Fd9846fe4419C0288c469DbdCd8E';
  
    const OP_DEST_CHAIN = '2664363617261496610'
    const RECEIVER_CONTRACT = '0xB468157d7AA547BE40E17945D3f443f5AF455ed2';
    const CCIP_BNM_TOKEN = '0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4';
    const AMOUNT_TO_SEND = '100';
  
    const senderAvalanche = new hre.ethers.Contract(SENDER_CONTRACT_ADDRESS, abi, signer);

    console.log(JSON.stringify(senderAvalanche));

    const response = await senderAvalanche.transferTokensPayLINK(
        OP_DEST_CHAIN,
        RECEIVER_CONTRACT,
        CCIP_BNM_TOKEN,
        AMOUNT_TO_SEND
    )

    console.log('finished sending to CCIP')

    console.log(JSON.stringify(response));
});


const config: HardhatUserConfig = {
  solidity: "0.8.19",
  networks: {
    fuji: {
      url: rpcUrl,
      accounts: [privateKey]
    }
  }
};

export default config;

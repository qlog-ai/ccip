# Smartcon Hacker House - CCIP

## Why use CCIP ?
[qlog.ai](https://qlog.ai/) is a revolutionary data market platform that allows users to take control of their data and provide value at scale to data consumers.  

Would this service be as good if you could only interact on a single chain ?  

**NO**

Consumers need access on any EVM-compatible chain of their choosing.
CCIP enables this functionality by allowing users to interact with the qlog source contracts on Avalanche from any chain.  

The value is transferred in a secure and decentralised way, without the need for centralised, vulnerable bridges. [read more CCIP](https://docs.chain.link/ccip)

## Contract Deployment

CCIP Sender contract must be deployed to each desired source network.

Deployment arguments
- Router Address : Desired source network router [see here](https://docs.chain.link/ccip/supported-networks)
- Link Address : Deployed address of LINK token on source network

Example :  
Avalanche Fuji (source) -> Optimism Goerli (destination)

Router Address (Avalanche) : `0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8`
Link Address (Avalanche) : `0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846`

### Deploy sender contract to desired network
```shell
npx hardhat deploy --network NETWORK
```

### Send Message Using Harhat Task
```shell
npx hardhat send-avalanche DEPLOYED_CONTRACT_ADDRESS --network NETWORK
```

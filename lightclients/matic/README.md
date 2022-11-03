# Brief Description

The LightNode.sol contract is an custom implementation of Matic light client on map chain. It operate by periodically fetching instances of LightClientBlockView from Matic and verify its validity.

The LightNodeProxy.sol contract is an proxy contract of LightNode.sol.

The MPTVerify.sol contract is receipt MerklePatriciaProof verify util.

# Contract Deployment Workflow

## Pre-requirement

Since all of the contracts are developed in Hardhat development environment, developers need to install Hardhat before working through our contracts. The hardhat installation tutorial can be found here[hardhat](https://hardhat.org/hardhat-runner/docs/getting-started#installation)

### install

```
npm install
```

create an .env file and fill following in the contents

```
#your ethereum account private key
PRIVATE_KEY = 
# matic rpc url
MATICURI = 
//MPTVerify address  if you not want to repeat the deployment of MPTVerify put deployed address it Otherwise empty
MPT_VERIFY = 
```

### Compiling contracts

We can simply use hardhat built-in compile task to compile our contract in the contracts folder.

```
$ npx hardhat compile
Compiling...
Compiled 1 contract successfully
```

The compiled artifacts will be saved in the `artifacts/` directory by default

## Testing contracts

```
$ npx hardhat test
Compiled 19 Solidity files successfully


  lightNode
    Deployment
Implementation deployed to ..... 0x5FbDB2315678afecb367f032d93F642f64180aa3
lightNodeProxy deployed to ..... 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
      √ initWithValidators must owner (721ms)
      √ initWithBlock must owner (441ms)
      √ init should be ok (573ms)
      √ Implementation upgradle must admin (102ms)
      √ Implementation upgradle ok (128ms)
      √ change admin  (78ms)
      √ trigglePause  only admin  (111ms)
      √ updateBlockHeader ... paused  (504ms)


  8 passing (3s)

```

## Deploy contracts

The deploy script is located in deploy folder . We can run the following command to deploy.

```
//deploy MPTVerify
npx hardhat deploy --tags MPTVerify

//deploy MPTVerify on makalu network
npx hardhat deploy --tags MPTVerify --network makalu

//deploy lightNode implementation
npx hardhat deploy --tags LightNode

//deploy lightNode implementation on makalu network
npx hardhat deploy --tags LightNode --network makalu

//deploy lightNode proxy 
npx hardhat deploy --tags Proxy

//deploy lightNode proxy on makalu network
npx hardhat deploy --tags Proxy --network makalu

// upgrade 
npx hardhat deploy --tags Upgrade --network makalu
```

[more details about hardhat-depoly are available](https://github.com/wighawag/hardhat-deploy)

[makalu faucet ](https://faucet.maplabs.io/)
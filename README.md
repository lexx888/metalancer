#  Metalancer: a portfolio investment and DEX protocol for Metis
![image](https://user-images.githubusercontent.com/80399594/146687997-1eac15dd-ad7d-4a90-9038-4c2ace249697.png)
![image](https://user-images.githubusercontent.com/80399594/147783504-f4d4366e-8f24-41d5-9f42-5f5b5947d97c.png)

### Introduction
**Metis** is an easy-to-use, highly scalable, low-cost, and fully functional Ethereum Layer 2 framework.

**Balancer** is an automated, on-chain portfolio manager and liquidity provider. Balancer is based on an N-dimensional invariant surface which is a generalization of the constant product formula described by Vitalik Buterin.

### Enter Metalancer
**Metalancer** introduces battle-proven Balancer Bronze realease to the Metis ecosystem. Our ultimate goal is to **is to build state-of-the-art portfolio investment protocol for Metis on top of the secure, audited and well-tested Balancer's codebase**. 

The project name emphasizes the synergy we see between scalablility of Metis and flexibility of Balancer: 

**Met**is + B**alancer** = ❤️Met-alancer (+ a pinch of _meta_ hype)

### Vision and Motivation

Portfolio investment is a cornerstone of modern finance both for institutional and private investors. **Metalancer** aims to enable decentralized portfolio investments in the Metis ecosystem. It uses the Balancer Protocol as its core building block. Our ultimate goal is to create an investment and yield platform that would offer portfolios with clearly defined strategies and risk profiles. 

### Opportunity

Balancer is a brilliant protocol that deserves wider adoption. We believe that Balancer’s unique proposition - portfolio management via multi-asset weighted pools - has not been used to its full extent. Balancer is focused on competing with traditional AMMs (e.g. UniSwap and SushiSwap), with its pools used mainly to service swap operations rather than to enable portfolio strategies.

Our team sees an untapped opportunity in turning Metis into a go-to portfolio investment platform on  for private investors, asset managers and financial institutions interested in crypto assets. We believe that Metalancer can become an important step in this direction.


## Summary of main contributions

We have 

* built a monorepo for the Balancer's front-end dapp and all its packages. Orignial Balancer dapp imports most of the packages as node modules, making it hard to build on top of the Balancer's code base. Metalancer allows Metis builders' community to easily modify Balancer's front-end and Smart Order Routing source code, with instant rebuild/reload tooling enabled.
* gathered all the necessary contracts in one a single repo (mutlicall, router, pool registry contracts). Previously, they were scattered around several different GitHub repos with no clear links between them, i.e. it was unclear what contracts are required, what versions were compatible, etc. Now everything is in complete synch and is deployment-ready.
* migrated Balancer's Solidity build from Truffle to Hardhat. Hardhat is a feature rich, fast and highly configurable Solidity development environment.
* added deployment and configuration scripts for a turn-key launch of the Balancer on Metis, including detailed tutorial on launching Balancer on Stardust testnet and configuring its front-end. Previsously, there were only unit tests available as a source of information on how to configure Balancer's contracts. No tutorial was available for the Smart Order routing and Front-end dApp configuration. 
* revamped balance retrival mechanism that relied on a custom multicall with no source code available. Balancer uses a custom multicall contract, which is not in Balancer's Github repo. This was a major show stopper for deployment of Balancer to Metis. Our fork does not require this contract anymore.
* added a `Staking` contract for a fixed-term (4 weeks) liquidity farming. It should incentives investors to provide liquidity for a longer period and pursue more long-term investment, while increasing Metis TVL and Metalancer's liquidity. 
* created a mockup for a new portfolio investment UI, making it more newbie friendly and focused on strategic portfolio investment
* tweaked swap UI, introduced a spaceship to the frontpage☺️

## Future work

There several things we, unfortubately, were unable to fully complete before the deadline of Metis Ethereum Hackathon: 

- The new investment UI is proof-of-concept and is not fully functional at the moment
- `Staking` contract has been developed, but the UI for staking is not ready yet

## Roadmap
For the roadmap, please consult `Metalancer DAC Lightpaper` uploaded with the submission.

# Configuring and running on Stardust Testnet

## Compiling and deploying contracts

All contracts are located in `contracts-hardhat` directory:

```shell
cd metalancer/contracts-hardhat
```
Open `hardhat.config.js`, find the Stardust network config and set the the private keys for the pool's admin and one of the user:

```js
metis_stardust: {
    url: "https://stardust.metis.io/?owner=588",
    accounts: [
        'ADMIN_PRIVATE_KEY',
        'USER_PRIVATE_KEY',
    ]      
}
```
We have created a single deployment and configuration script that will peform all necessary steps to launch Balancer's contracts. All you need is to run:

```shell
yarn hardhat run scripts/deploy.js --network metis_stardust
```

This script will create one pool wit 3 test tokens (`TOK1`, `TOK2` and `TOK3`) and mint these tokens to the admin and a user, whose keys you have entered into `hardhat.config.js`.

The output of this script will contain all contract address that have to be configured on the frontend. The actual output of the script that was used for the Demo on the testnet is provided below:

```
Deployer account: 0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC
User account: 0xF792cBc00Ee0e961017f634A3B3CD58e17019F86
Deployer balance before deployment: 1499563380000000000
BFactory deployed to: 0xe74C0Ae9f38b2dE34ec78FbF83Af68125A456998
WEth deployed to: 0x5e60843E249F2D75311Fe6583c6FB727c6b9Cd7F
Registry deployed to: 0xC125B4a359e03683B26f67b7cc421518E5b47F82
ExchangeProxy deployed to: 0x8DcCa026Ca829D479E004b61f6d94451ca90f2Fc
Multicall deployed to:  0xd8F763e9778CDcEaD5c7A795120ED6f8B7af537d
Pool address: 0xB994a8A7242e48D15f47E22e98e8BAEbE09B0548
TOK1 address: 0x1A30eE1295e0f10d3D9bDDc763510b3baFD1be98
TOK2 address: 0x6925EA17e5BcCb23CB271530cad999B992D50799
TOK3 address: 0x00B205bB15729dc21BBEf9b422498cFebE4CC4F0
Minted TOK1 for 0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC, balance: 10000000000000000000000
Minted TOK2 for 0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC, balance: 20000000000000000000000
Minted TOK3 for 0xAa0FE1e5500b20615e51deB3b8E41E4c90e2AcDC, balance: 30000000000000000000000
Minted TOK1 for 0xF792cBc00Ee0e961017f634A3B3CD58e17019F86, balance: 10000000000000000000000
Minted TOK2 for 0xF792cBc00Ee0e961017f634A3B3CD58e17019F86, balance: 20000000000000000000000
Minted TOK3 for 0xF792cBc00Ee0e961017f634A3B3CD58e17019F86, balance: 30000000000000000000000
TOK0 balance after bind:500000000000000000000
TOK1 balance after bind:600000000000000000000
TOK2 balance after bind:700000000000000000000
Fee is 3000000000000000
Public swap: true
Finalized: true
```



## Configuring, building and runing the front-end

The front-end (off-chain) code is located in the `packages` directory.

Balancer's frontend code relies heavily on hardcoded contract addresses. To make it work properly, you need to replace these them with the addresses provied by the deployment script (see the output above). While tedious, it is pretty straighforward if you know where to look. The full list of files containing hardcoded facotory, pool and token addresses that has to be modified:

```
packages/balancer-frontend/src/config/metis.json
packages/balancer-frontend/src/assets/pools.json
packages/balancer-frontend/src/api/ethereum.ts
packages/balancer-frontend/src/utils/storage.ts
packages/balancer-frontend/.env
packages/balancer-assets/lists/eligible.json
packages/balancer-assets/lists/listed.json
packages/ethcall/src/provider.ts
packages/balancer-frontend/node_modules/balancer-assets/scripts/generate-registry.js
packages/balancer-frontend/src/utils/provider.ts
```


To build front-end run:

```
npm install --global lerna
lerna bootstrap
```

### Run

To launch Balancer dapp, execute:

```
cd packages/balancer-frontend
npm run serve
```
## Online demo

TBA

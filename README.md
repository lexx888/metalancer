#  Metalancer: a portfolio investment and DEX protocol for Metis
![image](https://user-images.githubusercontent.com/80399594/146687997-1eac15dd-ad7d-4a90-9038-4c2ace249697.png)
![image](https://user-images.githubusercontent.com/80399594/147783504-f4d4366e-8f24-41d5-9f42-5f5b5947d97c.png)

## Metalancer = Metis + Balancer + a pinch of meta hype
### Introduction
**Metis** is an easy-to-use, highly scalable, low-cost, and fully functional Ethereum Layer 2 framework.

**Balancer** is an automated, on-chain portfolio manager and liquidity provider. Balancer is based on an N-dimensional invariant surface which is a generalization of the constant product formula described by Vitalik Buterin.

### Enter Metalancer
**Metalancer** introduces battle-proven Balancer Bronze realease to the Metis ecosystem. Our ultimate goal is to **is to build state-of-the-art portfolio investment protocol for Metis on top of the secure, audited and well-tested Balancer's codebase**. 

### Vision and Motivation

Portfolio investment is a cornerstone of modern finance both for institutional and private investors. **Metalancer** aims to enable decentralized portfolio investments in the Metis ecosystem. It uses the Balancer Protocol as its core building block. Our ultimate goal is to create an investment and yield platform that would offer portfolios with clearly defined strategies and risk profiles. 

### Opportunity

Balancer is a brilliant protocol that deserves wider adoption. We believe that Balancer’s unique proposition - portfolio management via multi-asset weighted pools - has not been used to its full extent. Balancer is focused on competing with traditional AMMs (e.g. UniSwap and SushiSwap), with its pools used mainly to service swap operations rather than to enable portfolio strategies.

Our team sees an untapped opportunity in turning Metis into a go-to portfolio investment platform on  for private investors, asset managers and financial institutions interested in crypto assets. We believe that Metalancer can become an important step in this direction.


## Summary of main contributions

* We've built a monorepo for the Balancer's front-end dapp and all its packages. Orignial Balancer dapp imports most of the packages as node modules, making it hard to build on top of the Balacner's code base. 
* We've gathered all the necessary contracts in one a single repo (mutlicall, router, pool registry contracts). Previously, they were scattered around several different GitHub repos with no clear links between them, i.e. it was unclear what contracts are required, what versions were compatible, etc. Now everything is in complete synch and is deployment-ready.
* We've revamped balance retrival mechanism that relied on a custom multicall with no source code available. Balancer uses a custom multicall contract, which is not in Balancer's Github repo. This was a major show stopper for deployment of Balancer to Metis. Our fork does not require this contract anymore.
* We've added deployment and configuration scripts for a turn-key launch of the Balancer.
* We've introduced a spaceship to the frontpage ☺️

## Future work (roadmap)

There working on several unique features for our version of Balancer: 

- introduction of "loyalty" liquidity staking that makes it more profitable to provide liquidity early and longer, increasing Metis TVL
- more user friendly user investment experience for those who are new to cryptoassets, e.g. pools that correspond to mid-to-long term portfolio investment strategies, e.g. "invest in Metaverse tokens", "invest in L2 tokens" , "invest in DeFi tokens", "invest in stable coins"
- more efficient on-chain smart order routing enabled by smaller gas costs on Metis

# Configuring and running Balancer locally

TBD

## Running a local testnet

TBD

### Build 

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

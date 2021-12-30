const hre = require("hardhat");


// --------------------------------------------------
// yarn hardhat run scripts/deploy.js --network metis
// --------------------------------------------------


async function main() {

    const [deployer, user] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("User account:", user.address);
    console.log("Deployer balance before deployment:", (await deployer.getBalance()).toString());

    const BFactory = await hre.ethers.getContractFactory("BFactory");
    const bfactory = await BFactory.deploy();
    await bfactory.deployed();
    console.log("BFactory deployed to:", bfactory.address);

    const WEth = await hre.ethers.getContractFactory("WEth");
    const weth = await WEth.deploy();
    await weth.deployed();
    console.log("WEth deployed to:", weth.address);

    const BRegistry = await hre.ethers.getContractFactory("BRegistry");
    const registry = await BRegistry.deploy(bfactory.address);
    await registry.deployed();
    console.log("Registry deployed to:", registry.address);


    const ExchangeProxy = await hre.ethers.getContractFactory("ExchangeProxy");
    const proxy = await ExchangeProxy.deploy(weth.address);
    await proxy.deployed();

    console.log("ExchangeProxy deployed to:", proxy.address);
    await proxy.setRegistry(registry.address);


    const Multicall = await hre.ethers.getContractFactory("Multicall");
    const multicall = await Multicall.deploy();
    await multicall.deployed();
    console.log("Multicall deployed to: ", multicall.address);



    // pool set up
    let poolTx = await (await bfactory.newBPool()).wait();
    //console.log(poolTx);
    let pool_address = poolTx.events[0].args["pool"];
    //console.log(poolTx.events);
    console.log("Pool address: " + pool_address);

    const BPool = await ethers.getContractFactory("BPool");
    const bpool = await BPool.attach(pool_address);

    // console.log("Is pool is finalized? (should be false): " + await bpool.isFinalized());
    const TToken = await hre.ethers.getContractFactory("TToken");
    const token1 = await TToken.deploy("Token1", "TOK1", 18);
    await token1.deployed();
    const token2 = await TToken.deploy("Token2", "TOK2", 18);
    await token2.deployed();
    const token3 = await TToken.deploy("Token3", "TOK3", 18);
    await token3.deployed();

    console.log("TOK1 address:", token1.address);
    console.log("TOK2 address:", token2.address);
    console.log("TOK3 address:", token3.address);

    let accounts = [deployer.address, user.address];
    let tokens = [token1, token2, token3];
    let tokensBalances = [
        '10000',
        '20000',
        '30000'
    ];
    for (let i = 0; i < 2; i++) {
        for (let t = 0; t < 3; t++) {
            await tokens[t].mint(accounts[i], web3.utils.toWei(tokensBalances[t]));
            console.log("Minted " + await tokens[t].symbol() + " for " + accounts[i] + ", balance: " + (await tokens[t].balanceOf(accounts[i])).toString());
        }
    }


    // approve admin tokens                                 
    await tokens[0].approve(pool_address, web3.utils.toWei('10000'));
    console.log('approve 1');
    await tokens[1].approve(pool_address, web3.utils.toWei('20000'));
    console.log('approve 2');
    await tokens[2].approve(pool_address, web3.utils.toWei('30000'));
    console.log('approve 3');


    // bind tokens      1_000_000_000_000_000_000
    //await bpool.bind(tokens[0].address, web3.utils.toBN(20 * 10 ** 18), web3.utils.toBN(5 * 10 ** 18));
    await bpool.bind(tokens[0].address, web3.utils.toWei('500'), web3.utils.toWei('5'));
    console.log('bind 1');
    await bpool.bind(tokens[1].address, web3.utils.toWei('600'), web3.utils.toWei('5'));
    console.log('bind 2');
    await bpool.bind(tokens[2].address, web3.utils.toWei('700'), web3.utils.toWei('5'));
    console.log('bind 3');

    for (let i = 0; i < 3; i++) {
        const balance = await bpool.getBalance(tokens[i].address);
        console.log("TOK" + i + " balance after bind:" + balance);
    }

    // set fees 
    await bpool.setSwapFee(web3.utils.toWei('0.003'));
    const swapFee = await bpool.getSwapFee();
    console.log("Fee is " + swapFee);

    // enable public swap
    await bpool.setPublicSwap(true);
    const publicSwap = await bpool.isPublicSwap();
    console.log("Public swap: " + publicSwap);


    // finilze pool
    let finalizationResult = await bpool.finalize();
    const finalized = await bpool.isFinalized();
    console.log('Finalized: ' + finalized);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

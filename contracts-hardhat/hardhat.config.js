require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address +" balance " + (await account.getBalance()).toString());
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.5.12",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
    networks: {
      ropsten: {
        url: process.env.ROPSTEN_URL || "",
        accounts:
          process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      },
      metis_local: {
        url: "http://localhost:8545",
        accounts: [
          '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
          '0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d',
        ]
      
      },
      metis_stardust: {
        url: "https://stardust.metis.io/?owner=588",
        accounts: [
          'ADMIN_PRIVATE_KEY',
          'USER_PRIVATE_KEY',
        ]      
      }

      
    },
    gasReporter: {
      enabled: process.env.REPORT_GAS !== undefined,
      currency: "USD",
    },
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY,
    },
};

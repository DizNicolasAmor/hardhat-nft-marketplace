require("dotenv").config({ path: __dirname + "/.env" });
require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    localhost: {
      chainId: 31337,
      accounts: [
        `${process.env.PRE_FUNDED_PRIVATE_KEY_1}`,
        `${process.env.PRE_FUNDED_PRIVATE_KEY_2}`,
      ],
    },
  },
  paths: {
    artifacts: "../frontend/artifacts",
  },
  solidity: "0.8.4",
};

// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { name, symbol, initialSupply } = require("./deploySettings");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const MyToken = await hre.ethers.getContractFactory("MyToken");
  const token = await MyToken.deploy(name, symbol, initialSupply);

  console.log("Deploying Token...");
  await token.deployed();

  console.log("MyToken deployed to:", token.address);

  const tokenName = await token.name();
  const tokenSymbol = await token.symbol();
  const tokenTotalSupply = await token.totalSupply();

  console.log(`Token name: ${tokenName}`);
  console.log(`Token symbol: ${tokenSymbol}`);
  console.log(`Total supply: ${tokenTotalSupply}`);

  return token;
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

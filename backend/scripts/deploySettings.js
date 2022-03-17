const { ethers } = require("hardhat");

module.exports = {
  name: "My Token",
  symbol: "MY_TOKEN",
  initialSupply: ethers.utils.parseUnits("100"),
};

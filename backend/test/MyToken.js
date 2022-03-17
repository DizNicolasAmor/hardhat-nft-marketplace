const { ethers } = require("hardhat");
const { expect } = require("chai");
const { name, symbol, initialSupply } = require("../scripts/deploySettings");

describe("MyToken", function () {
  let token;
  let deployer, user;

  before(async () => {
    [deployer, user] = await ethers.getSigners();

    const MyToken = await hre.ethers.getContractFactory("MyToken");
    token = await MyToken.deploy(name, symbol, initialSupply);

    await token.deployed();
  });

  describe("Deployment", function () {
    it("Should deploy with the right params", async function () {
      expect(await token.name()).to.equal(name);
      expect(await token.symbol()).to.equal(symbol);
      expect(await token.totalSupply()).to.equal(initialSupply);
    });
  });

  describe("Interactions", function () {
    it("Assigns initial balance", async () => {
      expect(await token.balanceOf(deployer.address)).to.equal(initialSupply);
    });

    it("Transfer emits event", async () => {
      await expect(token.transfer(user.address, 7))
        .to.emit(token, "Transfer")
        .withArgs(deployer.address, user.address, 7);
    });

    it("Can not transfer above the amount", async () => {
      await expect(
        token.transfer(deployer.address, initialSupply.add(1))
      ).to.be.revertedWith("ERC20: transfer amount exceeds balance");
    });

    it("Send transaction changes receiver balance", async () => {
      await expect(() =>
        deployer.sendTransaction({
          to: user.address,
          value: 200,
        })
      ).to.changeBalance(user, 200);
    });

    it("Should transfer failed", async function () {
      try {
        await token.transfer(user, 100);
      } catch (err) {
        return;
      }
      expect.fail("Should transfer failed");
    });
  });
});

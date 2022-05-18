const LOCALHOST_CHAIN_ID = 31337;
const CONTRACT_ADDRESSES = {
  [LOCALHOST_CHAIN_ID]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};
const imageURI =
  "https://ipfs.io/ipfs/bafybeig37ioir76s7mg5oobetncojcm3c3hxasyd4rvid4jqhy4gkaheg4/?filename=0-PUG.json";

async function populateMarketplace() {
  const contractAddress = CONTRACT_ADDRESSES[LOCALHOST_CHAIN_ID];
  const nftMarketplace = await ethers.getContractAt(
    "NFTMarketplace",
    contractAddress
  );
  const auctionPrice = ethers.utils.parseUnits("1", "ether");
  const listingPrice = await nftMarketplace.getListingPrice();
  const value = listingPrice.toString();

  const nft = await nftMarketplace.createToken(imageURI, auctionPrice, {
    value,
  });
  await nft.wait(1);

  console.log({ nft });
}

populateMarketplace()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

const LOCALHOST_CHAIN_ID = 31337;
const CONTRACT_ADDRESSES = {
  [LOCALHOST_CHAIN_ID]: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
};
const dogImagesURI = {
  PUG: "https://ipfs.io/ipfs/QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8?filename=pug.png",
  SHIBA_INU:
    "https://ipfs.io/ipfs/QmYx6GsYAKnNzZ9A6NvEKV9nf1VaDzJrqDR23Y8YSkebLU?filename=shiba-inu.png",
  ST_BERNARD:
    "https://ipfs.io/ipfs/QmUPjADFGEKmfohdTaNcWhp7VGk26h5jXDA7v3VtTnTLcW?filename=st-bernard.png",
};
const imagesURI = Object.values(dogImagesURI);

async function populateMarketplace() {
  const contractAddress = CONTRACT_ADDRESSES[LOCALHOST_CHAIN_ID];
  const nftMarketplace = await ethers.getContractAt(
    "NFTMarketplace",
    contractAddress
  );
  const auctionPrice = ethers.utils.parseUnits("1", "ether");
  const listingPrice = await nftMarketplace.getListingPrice();
  const value = listingPrice.toString();

  const nfts = await Promise.all(
    imagesURI.map(async (uri) => {
      const nft = await nftMarketplace.createToken(uri, auctionPrice, {
        value,
      });
      return nft;
    })
  );
  console.log({ nfts });
}

populateMarketplace()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

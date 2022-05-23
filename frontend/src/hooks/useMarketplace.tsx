import { Contract, ethers, providers } from 'ethers';
import axios from 'axios';
import NFTMarketplace from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { CONTRACT_ADDRESSES } from '../utils/constants';

const useMarketplace = (chainId: number) => {
  const contractInstancesMap: { [key: number]: Contract | null } = {};

  const getContract = async () => {
    try {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const instantiatedContract = new ethers.Contract(
        CONTRACT_ADDRESSES[chainId],
        NFTMarketplace.abi,
        signer
      );
      contractInstancesMap[chainId] = instantiatedContract;

      return instantiatedContract;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchContractHOF = async (contractFetchFunctionName: string) => {
    try {
      const contract = await getContract();
      const items = await contract[contractFetchFunctionName]();
      const parsedItems = await Promise.all(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        items.map(async (i: any) => {
          const tokenUri = await contract.tokenURI(i.tokenId);
          const meta = await axios.get(tokenUri);
          const { image, name, description } = meta.data;
          const price = ethers.utils.formatUnits(i.price.toString(), 'ether');
          const tokenId = i.tokenId.toNumber();

          return {
            price,
            tokenId,
            seller: i.seller,
            owner: i.owner,
            image,
            name,
            description,
          };
        })
      );
      return parsedItems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const fetchMarketItems = async () =>
    await fetchContractHOF('fetchMarketItems');

  const fetchMyNFTs = async () => await fetchContractHOF('fetchMyNFTs');

  const fetchItemsListed = async () =>
    await fetchContractHOF('fetchItemsListed');

  const createToken = async (tokenURI: string, price: string) => {
    try {
      const contract = await getContract();
      const listingPrice = await contract.getListingPrice();
      const value = listingPrice.toString();
      // const transaction = await contract.createToken(tokenURI, price, { value });
      // await transaction.wait();
      const tokenId = await contract.createToken(tokenURI, price, { value });

      return tokenId;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  return {
    createToken,
    fetchMarketItems,
    fetchMyNFTs,
    fetchItemsListed,
  };
};

export default useMarketplace;

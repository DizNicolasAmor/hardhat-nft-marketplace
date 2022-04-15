import { useEffect, useState } from 'react';
import { Contract, ethers, providers } from 'ethers';
import axios from 'axios';
import NFTMarketplace from '../../artifacts/contracts/NFTMarketplace.sol/NFTMarketplace.json';
import { CONTRACT_ADDRESSES, LOCALHOST_CHAIN_ID } from '../utils/constants';

const useMarketplace = (chainId: number) => {
  const [contractAddress, setContractAddress] = useState<string>(
    CONTRACT_ADDRESSES[LOCALHOST_CHAIN_ID]
  );
  const [contractInstance, setContractInstance] = useState<
    Contract | undefined
  >(undefined);

  useEffect(() => {
    const newAddress: string = CONTRACT_ADDRESSES[chainId];
    if (newAddress) {
      setContractAddress(newAddress);
    } else {
      console.warn(
        `Contract address not found in network with chainId: ${chainId}`
      );
    }
  }, [chainId]);

  const getContract = async () => {
    if (contractInstance) return contractInstance;

    try {
      const provider = new providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const instantiatedContract = new ethers.Contract(
        contractAddress,
        NFTMarketplace.abi,
        signer
      );
      setContractInstance(instantiatedContract);

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

  return [fetchMarketItems, fetchMyNFTs, fetchItemsListed] as const;
};

export default useMarketplace;

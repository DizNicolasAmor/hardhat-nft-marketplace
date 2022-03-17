import { Contract, ethers, providers } from 'ethers';
import { useEffect, useState } from 'react';
import MyToken from '../../artifacts/contracts/MyToken.sol/MyToken.json';
import { CONTRACT_ADDRESSES, LOCALHOST_CHAIN_ID } from '../utils/constants';

const useToken = (chainId: number) => {
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
        MyToken.abi,
        signer
      );
      setContractInstance(instantiatedContract);

      return instantiatedContract;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getContractInformation = async (): Promise<any | undefined> => {
    try {
      const contract = await getContract();
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const balance = await contract.balanceOf(accounts[0]);
      const name = await contract.name();
      const symbol = await contract.symbol();

      return { balance, name, symbol };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  async function transferToken(receiverAddress: string, amountToSend: string) {
    if (!receiverAddress || !amountToSend) return;

    const contract = await getContract();
    const parsedAmount = ethers.utils.parseUnits(amountToSend);
    const transaction = await contract.transfer(receiverAddress, parsedAmount);
    await transaction.wait();
  }

  return [getContractInformation, transferToken] as const;
};

export default useToken;

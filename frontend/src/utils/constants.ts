export const LOCALHOST_CHAIN_ID = 31337;

export const CONTRACT_ADDRESSES: { [key: number]: string } = {
  [LOCALHOST_CHAIN_ID]: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
};

const mapChainIdToNetworkName: { [id: number]: string } = {
  1: 'ethereum',
  3: 'ropsten',
  4: 'rinkeby',
  5: 'goerli',
  25: 'cronos',
  42: 'kovan',
  56: 'BSC',
  97: 'BSC testnet',
  137: 'polygon',
  250: 'fantom',
  43114: 'avalanche',
  80001: 'mumbai',
  [LOCALHOST_CHAIN_ID]: 'localhost',
};

export const getNetworkName = (chainId: number) =>
  mapChainIdToNetworkName[chainId] || 'unknown';

const mapChainIdToNetworkSymbol: { [id: number]: string } = {
  1: 'ETH',
  3: 'ETH',
  4: 'ETH',
  5: 'ETH',
  25: 'CRO',
  42: 'ETH',
  56: 'BNB',
  97: 'BNB',
  137: 'MATIC',
  250: 'FTM',
  43114: 'AVAX',
  80001: 'MATIC',
  [LOCALHOST_CHAIN_ID]: 'ETH',
};

export const getNetworkSymbol = (chainId: number) =>
  mapChainIdToNetworkSymbol[chainId] || 'unknown';

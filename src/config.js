const contractAddress = '0x298DFF86eBA91860B399d07106e21C83A23a7861' || process.env.REACT_APP_CONTRACT_ADDRESS;
const ntfContractAddress = '0xFE0440187Fe6b925ecdAAE1603B46EEE9Bd3c13d' || process.env.REACT_APP_CONTRACT_ADDRESS;

export default {
  contractAddress,
  openSeaUrl: 'https://testnets.opensea.io/collection/squarenft-e45ftndyti',
  ntfContractAddress,
  defaultProvider: 'rinkeby',
};

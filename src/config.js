const contractAddress = '0x298DFF86eBA91860B399d07106e21C83A23a7861' || process.env.REACT_APP_CONTRACT_ADDRESS;
const ntfContractAddress = '0x2E3ed61Dd9a69da70f79Cf5E455f63cc0afB68d8' || process.env.REACT_APP_CONTRACT_ADDRESS;

export default {
  contractAddress,
  openSeaUrl: 'https://testnets.opensea.io/collection/squarenft-myw7rmfqox',
  ntfContractAddress,
  defaultProvider: 'rinkeby',
};

import { ethers, utils } from 'ethers';
import config from '../config';
import contractABI from './WavePortal.json';
import nftContractABI from './MyEpicNFT.json';

const contractAddress = config.contractAddress;

export const truncateString = (str, length) => {
  if (str.length <= length) return str;

  return `${str.slice(0, length)}...`;
};

export const colorScheme = {
  light: {
    '--bg-main-color': '#FFFFFF',
    '--bg-second-color': '#EAEDF2',
    '--tx-main-color': '#282B31',
    '--tx-second-color': '#5F5F6E',
    '--bg-grey-color': '#DDE1E8'
  },

  dark: {
    '--bg-main-color': '#131419',
    '--bg-second-color': '#1C1C24',
    '--tx-main-color': '#FFFFFF',
    '--tx-second-color': '#EAEDF2',
    '--bg-grey-color': '#2D2D3A'
  }
};

export const toggleTheme = (mode) => {
  try {
    const root = document.querySelector(':root');

    const themeArray = Object.entries(colorScheme[mode]);
    themeArray.map(([key, color]) => root.style.setProperty(key, color));

    localStorage.setItem('theme', mode);
  } catch (error) {
    console.log(error);
  }
};

export const getTheme = () => localStorage.getItem('theme') || 'light';

export const connectWallet = async (callback) => {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });

    console.log("Connected", accounts[0]);
    if (typeof callback === 'function') {
      callback(accounts[0]);
    }
  } catch (error) {
    console.log(error);
  }
}

const checkIfUserConnectedWallet = async (callback) => {
  const { ethereum } = window;

  /*
  * Check if we're authorized to access the user's wallet
  */
  const accounts = await ethereum.request({ method: 'eth_accounts' });

  if (accounts.length !== 0) {
    const account = accounts[0];
    if (typeof callback === 'function') {
      callback(account);
    }

    return true;
  } else {
    console.log("No authorized account found");
  }

  return false;
}

export const checkIfWalletIsConnected = async (callback) => {
  const { ethereum } = window;

  if (!ethereum) {
    console.log("Make sure you have metamask!");
    return;
  }

  checkIfUserConnectedWallet(callback);
}

export const getBalance = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const userIsConnected = await checkIfUserConnectedWallet();

      if (!userIsConnected) return '0';

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const balance = await signer.getBalance();

      const eth = utils.formatEther(balance._hex, { commify: true });

      return Number.parseFloat(eth).toFixed(4);
    }

    return '0';
  } catch (error) {
    return '0';
  }
};

export const getTotalWaves = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const userIsConnected = await checkIfUserConnectedWallet();

      const provider = userIsConnected ? new ethers.providers.Web3Provider(ethereum) : ethers.getDefaultProvider(config.defaultProvider);
      const signer = userIsConnected ? provider.getSigner() : provider;

      const waveportalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      let count = await waveportalContract.getTotalWaves();

      return count.toNumber();
    }
  } catch (error) {
    return 0;
  }
};

export const getAllWaves = async (callback) => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const userIsConnected = await checkIfUserConnectedWallet();

      // if (!userIsConnected) return;

      const provider = userIsConnected ? new ethers.providers.Web3Provider(ethereum) : ethers.getDefaultProvider(config.defaultProvider);
      const signer = userIsConnected ? provider.getSigner() : provider;
      
      const waveportalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

      /*
       * Call the getAllWaves method from your Smart Contract
       */
      const waves = await waveportalContract.getAllWaves();


      /*
       * We only need address, timestamp, and message in our UI so let's
       * pick those out
       */

      const cleanWaves = waves.map((wave) => ({
        address: wave.waver,
        timestamp: getMessageTime(wave.timestamp * 1000),
        message: wave.message
      }));

      /*
       * Store our data in React State
       */
      if (typeof callback === 'function') callback(cleanWaves.reverse());
    } else {
      console.log("Ethereum object doesn't exist!")
    }
  } catch (error) {
    console.log(error);
  }
}

export const getNftsData = async () => {
  try {
    const { ethereum } = window;

    if (ethereum) {
      const userIsConnected = await checkIfUserConnectedWallet();

      const provider = userIsConnected ? new ethers.providers.Web3Provider(ethereum) : ethers.getDefaultProvider(config.defaultProvider);
      const signer = userIsConnected ? provider.getSigner() : provider;

      const waveportalContract = new ethers.Contract(config.ntfContractAddress, nftContractABI.abi, signer);

      let minted = await waveportalContract.getTotalNFTsMintedSoFar();
      let total = await waveportalContract.getTotalNFTs();

      return { minted: minted.toNumber(), total: total.toNumber() };
    }
  } catch (error) {
    return { minted: 0, total: 0 };
  }
};

export function getMessageTime(date) {
  try {
    let message = 'just now';
    let count;

    let today = new Date().getFullYear();
    const year = new Date(date).getFullYear();

    if (today > year) {
      count = today - year;
      message = count > 1 ? `${count} years ago` : 'a year ago';
      return message;
    }

    today = new Date().getMonth();
    const month = new Date(date).getMonth();

    if (today > month) {
      count = today - month;
      message = count > 1 ? `${count} months ago` : 'a month ago';
      return message;
    }

    today = new Date().getDay();
    const day = new Date(date).getDay();

    if (today > day) {
      count = today - day;
      message = count > 1 ? `${count} days ago` : 'a day ago';
      return message;
    }

    today = new Date().getHours();
    const hours = new Date(date).getHours();

    if (today > hours) {
      count = today - hours;
      message = count > 1 ? `${count} hours ago` : 'an hour ago';
      return message;
    }

    today = new Date().getMinutes();
    const minutes = new Date(date).getMinutes();

    if (today > minutes) {
      count = today - minutes;
      message = count > 1 ? `${count} minutes ago` : 'a minute ago';
      return message;
    }

    today = new Date().getSeconds();
    const seconds = new Date(date).getSeconds();

    if (today > seconds) {
      count = today - seconds;
      message = count > 1 ? `${count} seconds ago` : 'just now';
    }

    return message;
  } catch (e) {
    return 'few minutes ago';
  }
}

export function openInNewTab(href) {
  Object.assign(document.createElement('a'), {
    target: '_blank',
    href,
  }).click();
}

export const setupEventListener = async (callback) => {
  // Most of this looks the same as our function askContractToMintNft
  try {
    const { ethereum } = window;

    if (ethereum) {
      // Same stuff again
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(config.ntfContractAddress, nftContractABI.abi, signer);

      // THIS IS THE MAGIC SAUCE.
      // This will essentially "capture" our event when our contract throws it.
      // If you're familiar with webhooks, it's very similar to that!
      connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
        console.log(from, tokenId.toNumber())

        const nftLink = `https://testnets.opensea.io/assets/${config.ntfContractAddress}/${tokenId.toNumber()}`;

        if (typeof callback === 'function') callback(nftLink);

        openInNewTab(nftLink);
      });

      console.log("Setup event listener!")

    } else {
      console.log("Ethereum object doesn't exist!");
    }
  } catch (error) {
    console.log(error)
  }
}

export function handleTransactionError(payload) {
  const msg = 'error here :(';

  try {
    const { error } = payload;
    
    return error?.message || payload?.message || msg;
  } catch (error) {
    return msg;
  }
}
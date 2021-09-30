import { ethers, utils } from 'ethers';
import contractABI from './WavePortal.json';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

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

      if (!userIsConnected) return 0;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

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

      if (!userIsConnected) return;

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
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
        timestamp: new Date(wave.timestamp * 1000),
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
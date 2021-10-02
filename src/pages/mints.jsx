import { ethers } from 'ethers';
import React, { useContext, useEffect, useState } from 'react';

import '../App.css';
import { AppContext } from '../contexts';
import contractABI from '../utils/MyEpicNFT.json';
import { connectWallet, getBalance, getNftsData, getTotalWaves, setupEventListener } from '../utils';
import config from '../config';

export default function Mints() {
  const [{ account, isMining }, { setAccount, setBalance, setIsMining, setNfts, setWaves }] = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const callback = (account) => {
    setAccount(account);

    getBalance().then((value) => setBalance(value));
    getTotalWaves().then((value) => setWaves(value));
    getNftsData().then((value) => setNfts(value));
  };

  const askContractToMintNft = async () => {
    const CONTRACT_ADDRESS = config.ntfContractAddress;
    try {
      const { ethereum } = window;
      setIsLoading(true);

      setupEventListener();


      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, contractABI.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT();

        setIsMining(true);
        console.log("Mining...please wait.")
        await nftTxn.wait();

        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsMining(false);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setupEventListener();
  }, []);

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          <span aria-label="wave" role="img">👋</span> My NFT Collection!
        </div>

        <div className="bio mb-3">
          Each unique. Each beautiful. Discover your NFT today.
          <span className="ft-20" aria-label="grin" role="img"> 🙃</span>
        </div>

        <button onClick={account ? askContractToMintNft : () => connectWallet(callback)} className="btn btn-outline-blue btn-task w-100">
          {isLoading ? (isMining ? 'Mining...' : 'Loading...') : 'Let\'s mint !'}
        </button>

        {!account && (
          <button className="btn btn-danger w-100 mt-3" onClick={() => connectWallet(callback)}>
            Connect Metamask
          </button>
        )}
      </div>
    </div>
  );
}

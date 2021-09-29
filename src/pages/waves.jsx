import React, { useContext, useState } from 'react';
import { ethers, utils } from 'ethers';

import '../App.css';
import { AppContext } from '../contexts';
import { connectWallet } from '../utils';
import contractABI from '../utils/WavePortal.json';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export default function Home() {
  const [{ account, isMining }, { setAccount, setBalance, setIsMining, setWaves }] = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);

  const wave = async () => {
    try {
      const { ethereum } = window;
      setIsLoading(true);

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const waveportalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

        let count = await waveportalContract.getTotalWaves();

        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await waveportalContract.wave();

        setIsMining(true);
        console.log("Mining...", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await waveportalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const balance = await signer.getBalance();

        const eth = utils.formatEther(balance._hex, { commify: true });

        setBalance(Number.parseFloat(eth).toFixed(4));
        setWaves(count.toNumber());
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

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          <span aria-label="wave" role="img">👋</span> Hey there!
        </div>

        <div className="bio mb-3">
          Hiii, I'm Ayobami, in that learning phase. Tryna grasp blockchain :) <br />
          ! Connect your Ethereum wallet and wave at me! You just might get some fake eth in return
          <span className="ft-20" aria-label="grin" role="img"> 🙃</span>
        </div>

        <button className="btn btn-outline-blue btn-task w-100" onClick={account ? wave : () => connectWallet(setAccount)}>
          {isLoading ? (isMining ? 'Mining...' : 'Loading...') : 'Wave at Me'}
        </button>

        {!account && (
          <button className="btn btn-danger w-100 mt-3" onClick={() => connectWallet(setAccount)}>
            Connect Metamask
          </button>
        )}
      </div>
    </div>
  );
}

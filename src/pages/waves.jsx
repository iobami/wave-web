import React, { useContext, useEffect, useState } from 'react';
import { ethers, utils } from 'ethers';

import '../App.css';
import { AppContext } from '../contexts';
import { connectWallet, getAllWaves, getBalance, getTotalWaves } from '../utils';
import contractABI from '../utils/WavePortal.json';
import { WaveItem } from '../components';

const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;

export default function Home() {
  const [{ account, isMining }, { setAccount, setBalance, setIsMining, setWaves }] = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [allWaves, setAllWaves] = useState([]);
  const [form, setForm] = useState({ text: '', error: false });

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

        const waveTxn = await waveportalContract.wave(form.text);

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
        getAllWaves(setAllWaves);

        setForm({ ...form, text: '' });
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

  const callback = (account) => {
    setAccount(account);

    getBalance().then((value) => setBalance(value));
    getTotalWaves().then((value) => setWaves(value));
    getAllWaves(setAllWaves);
  };

  useEffect(() => {
    getAllWaves(setAllWaves);
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!form.text) {
      return setForm({ ...form, error: true });
    }

    if (account) {
      wave();
    } else {
      connectWallet(callback);
    }
  };

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          <span aria-label="wave" role="img">👋</span> Hey there!
        </div>

        <div className="bio mb-3">
          Hiii, I'm Ayobami, in that learning phase. Tryna grasp blockchain :) <br />
          Connect your Ethereum wallet and wave at me! or send your lovely spotify playlist ! <br />
          You just might get some fake eth in return
          <span className="ft-20" aria-label="grin" role="img"> 🙃</span>
        </div>

        <form class="needs-validation" novalidate onSubmit={onSubmit}>
          <div class="col-12 px-0 mb-3">
            <input
              type="text"
              class="form-control"
              placeholder="send me a wave"
              value={form.text} onChange={(e) => {
                if (e.target?.value?.length) {
                  setForm({ text: e.target.value, error: false });
                } else {
                  setForm({ ...form, text: e.target.value });
                }
              }}
            />

            {form.error && (
              <div class="text-danger pl-2">
                please enter a message, or a link. {':}'}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-outline-blue btn-task w-100">
            {isLoading ? (isMining ? 'Mining...' : 'Loading...') : 'Wave at Me'}
          </button>
        </form>

        {!account && (
          <button className="btn btn-danger w-100 mt-3" onClick={() => connectWallet(callback)}>
            Connect Metamask
          </button>
        )}

        {!!allWaves.length && (
          <hr className="w-100 mt-4 mb-1" />
        )}

        {allWaves.map((wave, index) => (
          <WaveItem wave={wave} key={index} />
        ))}
      </div>
    </div>
  );
}

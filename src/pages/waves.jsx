import React, { useContext, useEffect, useState } from 'react';
import { toast, Flip } from 'react-toastify';
import { ethers, utils } from 'ethers';

import '../App.css';
import { AppContext } from '../contexts';
import { connectWallet, getAllWaves, getBalance, getMessageTime, getTheme, getTotalWaves } from '../utils';
import contractABI from '../utils/WavePortal.json';
import { WaveItem } from '../components';
import config from '../config';

const contractAddress = config.contractAddress;

const checkIfUserHasSentAnyMessageEver = (address, waves) => {
  try {
    return waves.find((item) => parseInt(item.address) === parseInt(address));
  } catch (error) {
    return false;
  }
};

export default function Home() {
  const [{ account, isMining }, { setAccount, setBalance, setIsMining, setWaves }] = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [allWaves, setAllWaves] = useState([]);
  const [form, setForm] = useState({ text: '', error: false });

  const wave = async () => {
    try {
      if (window?.ethereum?.networkVersion !== '4') {
        toast.error('sorry, this app currently works on rinkeby :(', {
          transition: Flip,
          toastId: 'id--',
          theme: getTheme(),
        });

        return;
      }

      const { ethereum } = window;
      setIsLoading(true);

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const waveportalContract = new ethers.Contract(contractAddress, contractABI.abi, signer);

        let count = await waveportalContract.getTotalWaves();

        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await waveportalContract.wave(form.text, { gasLimit: 300000 });

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

        /**
         * Listen in for emitter events!
         */
        waveportalContract.on("NewWave", (from, timestamp, message) => {
          console.log("NewWave", from, timestamp, message);

          setAllWaves(prevState => [{
            address: from,
            timestamp: getMessageTime(wave.timestamp * 1000),
            message: message,
          }, ...prevState]);
        });

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

  const sent = checkIfUserHasSentAnyMessageEver(account, allWaves);

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

        <form className="needs-validation" noValidate onSubmit={onSubmit}>
          <div className="col-12 px-0 mb-3">
            <input
              type="text"
              className="form-control"
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
              <div className="text-danger pl-2">
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
          <WaveItem account={account} sent={sent} wave={wave} key={index} />
        ))}
      </div>
    </div>
  );
}

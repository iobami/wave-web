import React, { useContext, useEffect, useState } from 'react';

import '../App.css';
import { AppContext } from '../contexts';
import { connectWallet, getAllWaves, getBalance, getTotalWaves } from '../utils';

export default function Mints() {
  const [{ account, isMining }, { setAccount, setBalance, setWaves }] = useContext(AppContext);

  const [isLoading] = useState(false);
  const [, setAllWaves] = useState([]);

  const callback = (account) => {
    setAccount(account);

    getBalance().then((value) => setBalance(value));
    getTotalWaves().then((value) => setWaves(value));
    getAllWaves(setAllWaves);
  };

  useEffect(() => {
    getAllWaves(setAllWaves);
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

        <button type="submit" className="btn btn-outline-blue btn-task w-100">
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

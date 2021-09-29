import * as React from 'react';
// import { ethers } from 'ethers;

import '../App.css';

export default function Home() {

  const wave = () => {
    alert('! upcoming feature :)');
  }

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          <span aria-label="wave" role="img">👋</span> Hey there!
          </div>

        <div className="bio mb-3">
          Hiii, I'm Ayobami, in that learning phase. Tryna grasp blockchain :) ! Connect your Ethereum wallet and wave at me!
        </div>

        <button className="btn btn-outline-blue btn-task w-100" onClick={wave}>
          Wave at Me
        </button>
      </div>
    </div>
  );
}

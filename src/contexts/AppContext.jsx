import React, {
  useState, createContext,
} from 'react';

import { checkIfWalletIsConnected, getBalance, getTotalWaves } from '../utils';

const AppContext = createContext([{}, () => {}]);

const AppProvider = (props) => {
  const { children } = props;

  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [isMining, setIsMining] = useState(false);
  const [waves, setWaves] = useState(0);

  React.useEffect(() => {
    checkIfWalletIsConnected(setAccount);
  }, []);

  React.useEffect(() => {
    getBalance().then((value) => setBalance(value));
    getTotalWaves().then((value) => setWaves(value));
  }, []);

  const state = {
    account, balance, isMining, waves,
  };

  const setState = {
    setAccount, setBalance, setIsMining, setWaves,
  };

  return (
    <AppContext.Provider value={[state, setState]}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };

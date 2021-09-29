import React, { useState, createContext, useEffect } from 'react';
import { getTheme, toggleTheme } from '../utils';

const ThemeContext = createContext([{}, () => { }]);

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const mode = getTheme();

    toggleTheme(mode);
    setTheme(mode === 'light' ? 'light' : 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };

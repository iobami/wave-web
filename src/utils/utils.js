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

export const getTheme = () => localStorage.getItem('theme');

export const connectWallet = () => {
  alert('! upcoming feature :)');
}

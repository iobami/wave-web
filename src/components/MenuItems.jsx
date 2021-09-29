import React, { Fragment, useContext } from 'react';

import { Person, Sun, LogOut, Switch } from '../components';
import { ThemeContext } from '../contexts';
import { toggleTheme } from '../utils';

export default function MenuItems({ switchId }) {
  const [theme, setThemeMode] = useContext(ThemeContext);

  const setTheme = (e) => {
    const mode = e.target.checked ? 'dark' : 'light';

    toggleTheme(mode);
    setThemeMode(mode);
  };

  return (
    <Fragment>
      <div className="menu--items w-100">
        <div className="d-flex justify-content-start align-items-center item">
          <Person id={switchId} />
          <span className="ml-2">My Profile</span>
        </div>

        <hr />

        <div className="d-flex justify-content-between align-items-center item">
          <div onClick={setTheme} className="d-flex justify-content-start align-items-center">
            <Sun id={switchId} />
            <span className="ml-2">Dark Mode</span>
          </div>

          <Switch value={theme === 'dark' ? true : false} onClick={setTheme} id={`dark-mode-${switchId}`} />
        </div>

        <hr />

        <div className="d-flex justify-content-start align-items-center item">
          <LogOut id={switchId} />
          <span className="ml-2 log-out">Disconnected</span>
        </div>
      </div>

      <style>{`
        .menu--items {
          height: 100%;
        }

        .menu--items .item,
        .menu--items hr {
          margin-bottom: 20px;
          cursor: pointer;
        }
        
        .menu--items hr {
          margin-top: 0;
          border-top: 1px solid var(--bg-grey-color);
        }
        
        .menu--items .log-out {
          color: #E24444;
        }
      `}</style>
    </Fragment>
  );
}

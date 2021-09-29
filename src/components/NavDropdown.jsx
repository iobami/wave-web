import React, { Fragment } from 'react';
import { MenuItems } from '../components';

export default function NavDropdown({ show }) {

  return (
    <Fragment>
      <div className={`navbar-shortcut drop-down ${show ? 'show' : ''}`}>
        <div className="body w-100">
          <MenuItems />
        </div>
      </div>

      <style jsx="true">{`
        .navbar-shortcut.drop-down {
          background: var(--bg-second-color);
          border: 2px solid var(--bg-grey-color);
          border-top: none;
          border-radius: 0 0 15px 15px;
          padding: 16px 20px;
        
          position: absolute;
          top: 58px;
          right: 0;
        
          width: 254px;
          height: 108px;

          opacity: 0;
          z-index: -5;

          transition: height 0.12s ease-in-out, z-index 0.12s ease-in-out, opacity 0.15s ease-in-out;
        }

        .navbar-shortcut.drop-down.show {
          opacity: 1;
          z-index: 2;

          height: 238px;

          transition: height 0.12s ease-in-out, opacity 0.15s ease-in-out;
        }

        .navbar-shortcut.drop-down .body {
          height: 0;
          overflow: hidden;
        }

        .navbar-shortcut.drop-down.show .body {
          height: 100%;
          overflow: hidden;
        }
      `}</style>
    </Fragment>
  );
}

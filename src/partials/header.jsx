import React, { Fragment, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import BarLoader from 'react-bar-loader';

import { CoinStack, Logo, NavDropdown, PlusBlue } from '../components';
import { AppContext } from '../contexts';
import { useActiveRoute, useOutsideClick } from '../hooks';
import { connectWallet } from '../utils';

const middleItems = [
  // { icon: <Grid />, title: 'Waves', route: routes.dashboardEntry.path },
  // { icon: <Globe />, title: 'News', route: routes.dashboardEntry.path },
  // { icon: <Question />, title: 'Help', route: routes.dashboardEntry.path }
];

export default function Header() {
  const [{ account, balance, isMining, waves }, { setAccount }] = useContext(AppContext);

  const navToggleRef = useRef(null);

  const [showDropdown, setShowDropdown, navDropdownRef] = useOutsideClick(false, navToggleRef);

  const toggleDropdown = () => {
    let show = false;
    if (!showDropdown) show = true;

    setShowDropdown(show);
  };

  const [isActive] = useActiveRoute();

  return (
    <Fragment>
      <BarLoader color="#4447E2" height={isMining ? '1' : '0'} />

      <div className="tri-bloom-header">
        <div className="wrapper-size h-100">
          <div className="d-flex justify-content-between align-items-center h-100">
            {false && (
              <div className="d-flex justify-content-start align-items-center h-100">
                <Logo />
                <span aria-label="wave" role="img">👋</span>
                <span className="ml-2">Hiii</span>
              </div>
            )}

            <div className="d-flex justify-content-start align-items-center h-100">
              <span aria-label="wave" role="img">👋</span>

            <span className="ml-2">Waves | {waves || 0}</span>
            </div>

            <div className="d-flex justify-content-start align-items-center h-100 hide-lg-desktop mid-routes">
              {middleItems.map(({ icon, title, route }, index) => (
                <Link key={index} to={route}>
                  <div className={`nav route--item ${isActive(route)}`}>
                    <div className={`d-flex align-items-center ${index !== 0 && 'ml-5'}`}>
                      {icon}
                      <span className="ml-1">{title}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="d-flex justify-content-start align-items-center h-100">
              <div className="d-flex justify-content-start align-items-center h-100">
                <div className="d-flex justify-content-start align-items-center background-container--stack">
                  {!account && (<span className="cursor-pointer" onClick={() => connectWallet(setAccount)}><PlusBlue fill="#E24444" /></span>)}

                  <div className={`d-flex align-items-center ${account ? 'mx-1' : 'ml-3'}`}>
                    <CoinStack />
                    <span className="ml-1">{balance || 0}</span>
                  </div>
                </div>
              </div>

              <div className="d-flex h-100 ml-5 hide-lg-desktop position-relative">
                <div
                  onClick={toggleDropdown}
                  ref={navToggleRef}
                  className="d-flex justify-content-start align-items-center h-100 cursor-pointer"
                >
                  <img src="/imgs/avatar.png" alt="avatar" />
                  <span className={`ml-2 arrow ${showDropdown ? 'up' : 'down'}`} />
                </div>

                <div ref={navDropdownRef}><NavDropdown show={showDropdown} /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

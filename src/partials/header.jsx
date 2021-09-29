import React, { Fragment, useRef } from 'react';
import { Link } from 'react-router-dom';

import { CoinStack, Grid, Logo, NavDropdown, PlusBlue } from '../components';
import { useActiveRoute, useOutsideClick } from '../hooks';
import { connectWallet, routes } from '../utils';

export default function Header() {
  const middleItems = [
    { icon: <Grid />, title: 'Waves', route: routes.dashboardEntry.path },
    // { icon: <Globe />, title: 'News', route: routes.dashboardEntry.path },
    // { icon: <Question />, title: 'Help', route: routes.dashboardEntry.path }
  ];

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
      <div className="tri-bloom-header">
        <div className="wrapper-size h-100">
          <div className="d-flex justify-content-between align-items-center h-100">
            <div className="d-flex justify-content-start align-items-center h-100">
              <Logo />
              <span className="ml-2">Hiii</span>
            </div>

            <div className="d-flex justify-content-start align-items-center h-100 hide-lg-desktop">
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
                  <span className="cursor-pointer" onClick={connectWallet}><PlusBlue /></span>

                  <div className="d-flex align-items-center ml-3">
                    <CoinStack />
                    <span className="ml-1">0</span>
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

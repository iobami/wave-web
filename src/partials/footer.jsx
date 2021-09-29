import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Grid, Globe, Question, Menu } from '../components';
import { routes } from '../utils';
import { useActiveRoute } from '../hooks';

export default function Footer() {
  const bottomItems = [
    { icon: <Grid id="footer" />, title: 'Task List', route: routes.dashboardEntry.path },
    { icon: <Globe id="footer" />, title: 'News', route: '/news' },
    { icon: <Question id="footer" />, title: 'Help', route: '/help' },
    { icon: <Menu id="footer" />, title: 'Menu', route: routes.dashboardEntry.path }
  ];

  const [isActive] = useActiveRoute();

  return (
    <Fragment>
      <div className="tri-bloom-footer">
        <div className="wrapper-size h-100">
          <div className="d-flex justify-content-between align-items-center h-100 hide-lg-desktop">
            <div className="d-flex justify-content-start align-items-center h-100">
              <a href="http://twitter.com/iobami" target="_blank" rel="noopener noreferrer">
                <Twitter />
              </a>
              <span>&nbsp;</span>
              <span>&nbsp;</span>
            </div>

            <div>bambam © {new Date().getFullYear()} - All Rights Licensed</div>
          </div>

          <div className="show-lg-desktop h-100">
            <div className="d-flex justify-content-between align-items-center h-100">
              {bottomItems.map(({ icon, title, route }) => (
                <Link to={route} key={title}>
                  <div className={`nav route--item ${isActive(route)}`}>
                    <div className="text-center bottom--item" key={title}>
                      {icon}
                      <div className="title">{title}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

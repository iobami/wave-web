import React, { Fragment } from 'react';
import { MenuItems } from '../components';

export default function Menu() {

  return (
    <Fragment>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Menu</h4>
      </div>

      <div className="nav-dropdown menu">
        <MenuItems switchId={'menu'} />
      </div>

      <div className="d-flex justify-content-center">
        <div>© 2020 - All Rights Licensed</div>
      </div>
    </Fragment>
  );
}

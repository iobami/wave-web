import React, { Fragment } from 'react';
import { Footer, Header } from '../partials';

export default function DashboardLayout({ children }) {

  return (
    <Fragment>
      <Header />
      <div className="wrapper-size dashboard-main pt-4 pb-4">{children}</div>
      <Footer />
    </Fragment>
  );
}

import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts';

import MainLayout from './layouts/main';

import { routes as routesObject } from './utils';

const routes = Object.values(routesObject);

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <Switch>
          {routes.map((item, key) => (
            <Route exact={item.path === '/' ? true : false} path={item.path} key={`${item.path}-${key}`}>
              <MainLayout>
                {item.component()}
              </MainLayout>
            </Route>
          ))}
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

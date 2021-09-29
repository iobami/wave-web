import * as React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { AppProvider, ThemeProvider } from './contexts';

import MainLayout from './layouts/main';

import { routes as routesObject } from './utils';

const routes = Object.values(routesObject);

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          <Switch>
            {routes.map((item, key) => {
              const Component = () => item.component();
              
              return (
                <Route exact={item.path === '/' ? true : false} path={item.path} key={`${item.path}-${key}`}>
                  <MainLayout>
                    <Component />
                  </MainLayout>
                </Route>
              );
            })}
          </Switch>
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

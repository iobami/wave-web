import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './contexts';

import MainLayout from './layouts/main';

import Home from './pages'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <MainLayout>
          <Home />
        </MainLayout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

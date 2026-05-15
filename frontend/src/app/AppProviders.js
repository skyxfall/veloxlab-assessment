import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from '../state/DataContext';

function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <DataProvider>{children}</DataProvider>
    </BrowserRouter>
  );
}

export default AppProviders;

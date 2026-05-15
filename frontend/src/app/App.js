import React from 'react';
import AppProviders from './AppProviders';
import AppShell from './AppShell';
import '../design-system/index.css';

function App() {
  return (
    <AppProviders>
      <AppShell />
    </AppProviders>
  );
}

export default App;

import React from 'react';
import AppNav from '../design-system/organisms/AppNav';
import SkipLink from '../design-system/utility/SkipLink';
import AppRoutes from './AppRoutes';

function AppShell() {
  return (
    <>
      <SkipLink />
      <AppNav />
      <div id="main">
        <AppRoutes />
      </div>
    </>
  );
}

export default AppShell;

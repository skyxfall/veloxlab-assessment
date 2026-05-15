import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Items from '../pages/Items';
import NotFound from '../pages/NotFound';
import RouteFallback from '../design-system/utility/RouteFallback';

const ItemDetail = lazy(() => import('../pages/ItemDetail'));

function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route path="/" element={<Items />} />
        <Route path="/items/:id" element={<ItemDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;

import React, { memo } from 'react';
import PageLayout from '../templates/PageLayout';
import PageHeader from '../molecules/PageHeader';
import BackBreadcrumb from '../molecules/BackBreadcrumb';
import ItemDetailSkeleton from '../organisms/ItemDetailSkeleton';
import Skeleton from '../atoms/Skeleton';

const TITLE_SKELETON = (
  <Skeleton className="inline-block h-9 sm:h-10 w-72 max-w-full align-middle rounded-none" />
);

function RouteFallback() {
  return (
    <PageLayout>
      <PageHeader
        eyebrow={<BackBreadcrumb to="/" label="Items" />}
        title={TITLE_SKELETON}
      />
      <ItemDetailSkeleton />
    </PageLayout>
  );
}

export default memo(RouteFallback);

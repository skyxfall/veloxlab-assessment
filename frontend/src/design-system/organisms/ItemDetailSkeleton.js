import React, { memo } from 'react';
import Skeleton from '../atoms/Skeleton';

function ItemDetailSkeleton() {
  return (
    <article
      aria-busy="true"
      aria-label="Loading item"
      className="bg-bg-surface border border-line rounded-none p-xl sm:p-xxl min-h-[220px]"
    >
      <div className="flex items-center gap-sm mb-md">
        <Skeleton className="h-7 w-24 rounded-none" />
        <Skeleton className="h-5 w-24 rounded-pill" />
      </div>
      <div className="grid grid-cols-[max-content_1fr] gap-x-lg gap-y-sm">
        <Skeleton className="h-4 w-16 rounded-none" />
        <Skeleton className="h-4 w-32 rounded-none" />
        <Skeleton className="h-4 w-16 rounded-none" />
        <Skeleton className="h-6 w-24 rounded-none" />
      </div>
    </article>
  );
}

export default memo(ItemDetailSkeleton);

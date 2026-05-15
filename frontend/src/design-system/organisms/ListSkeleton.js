import React, { memo } from 'react';
import ListShell from './ListShell';
import Skeleton from '../atoms/Skeleton';

function ListSkeleton({ height, rowHeight, rowCount }) {
  const rows = rowCount ?? Math.floor(height / rowHeight);
  return (
    <ListShell height={height}>
      <ul aria-busy="true" aria-label="Loading items" className="list-none m-0 p-0">
        {Array.from({ length: rows }).map((_, i) => (
          <li
            key={i}
            style={{ height: rowHeight }}
            className="flex items-center gap-md px-md sm:px-lg border-b border-line-2"
          >
            <div className="flex items-center gap-md min-w-0 flex-1">
              <Skeleton className="hidden sm:block h-7 w-[88px] rounded-none shrink-0" />
              <Skeleton className="h-4 w-1/3 rounded-none" />
            </div>
            <div className="hidden sm:block w-[140px]">
              <Skeleton className="h-5 w-24 rounded-pill" />
            </div>
            <Skeleton className="h-5 w-[88px] rounded-none" />
          </li>
        ))}
      </ul>
    </ListShell>
  );
}

export default memo(ListSkeleton);

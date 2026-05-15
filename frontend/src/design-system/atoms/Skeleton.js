import React, { memo } from 'react';
import { cn } from '../utils/cn';

function Skeleton({ className }) {
  return <div aria-hidden="true" className={cn('ds-skeleton-shimmer', className)} />;
}

export default memo(Skeleton);

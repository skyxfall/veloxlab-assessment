import React, { memo } from 'react';
import { cn } from '../utils/cn';

const SIZES = {
  sm: 'w-3 h-3 border',
  md: 'w-4 h-4 border-2',
  lg: 'w-6 h-6 border-2',
};

function Spinner({ label = 'Loading', size = 'md', className }) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      className={cn(
        'inline-block rounded-pill border-line border-t-ink animate-spin',
        SIZES[size],
        className,
      )}
    />
  );
}

export default memo(Spinner);

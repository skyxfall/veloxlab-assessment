import React, { memo } from 'react';
import { cn } from '../utils/cn';

const VARIANTS = {
  neutral: 'bg-bg-subtle text-ink-2',
  info: 'bg-status-info-bg text-status-info',
  success: 'bg-status-success-bg text-status-success',
  warning: 'bg-status-warning-bg text-status-warning',
  danger: 'bg-status-danger-bg text-status-danger',
};

const DOT_VARIANTS = {
  neutral: 'bg-ink-4',
  info: 'bg-status-info',
  success: 'bg-status-success',
  warning: 'bg-status-warning',
  danger: 'bg-status-danger',
};

function Badge({ children, variant = 'neutral', dot = false, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-xs px-xs py-xxs rounded-pill text-label font-medium whitespace-nowrap',
        VARIANTS[variant],
        className,
      )}
    >
      {dot && (
        <span
          aria-hidden="true"
          className={cn('inline-block w-1.5 h-1.5 rounded-pill', DOT_VARIANTS[variant])}
        />
      )}
      {children}
    </span>
  );
}

export default memo(Badge);

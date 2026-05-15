import React, { memo } from 'react';
import { cn } from '../utils/cn';

function EmptyState({ title, description, action, className }) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center bg-bg-surface border border-line rounded-none px-xl py-xxl',
        className,
      )}
    >
      <p className="font-display text-h3 text-ink m-0">{title}</p>
      {description && (
        <p className="font-sans text-body text-ink-3 mt-xs mb-0 max-w-md">{description}</p>
      )}
      {action && <div className="mt-md">{action}</div>}
    </div>
  );
}

export default memo(EmptyState);

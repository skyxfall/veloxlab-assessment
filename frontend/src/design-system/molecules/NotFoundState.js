import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';

function NotFoundState({
  title = 'Item not found',
  description = "The item you're looking for doesn't exist or may have been removed.",
  backTo = '/',
  backLabel = 'Back to items',
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center bg-bg-surface border border-line rounded-none px-xl py-xxl">
      <span className="inline-flex items-center justify-center w-12 h-12 rounded-pill bg-rose-tint text-rose-ink mb-md">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
          <path d="M12 8v4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          <circle cx="12" cy="16" r="0.9" fill="currentColor" />
        </svg>
      </span>
      <p className="font-display text-h3 text-ink m-0">{title}</p>
      <p className="font-sans text-body text-ink-3 mt-xs mb-md max-w-md">{description}</p>
      <Link
        to={backTo}
        className="inline-flex items-center gap-xs h-10 px-md rounded-none bg-ink text-ink-invert font-sans text-body font-medium no-underline hover:bg-ink-2 transition-colors duration-fast ease-standard"
      >
        <Icon name="arrowLeft" size="sm" />
        <span>{backLabel}</span>
      </Link>
    </div>
  );
}

export default memo(NotFoundState);

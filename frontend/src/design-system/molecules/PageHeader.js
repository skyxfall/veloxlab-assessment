import React, { memo } from 'react';

function PageHeader({ id, title, subtitle, eyebrow, actions }) {
  return (
    <header className="flex flex-col gap-md sm:flex-row sm:items-end sm:justify-between mb-xl">
      <div className="min-w-0">
        <div className="h-7 mb-xs flex items-center">{eyebrow}</div>
        <h1
          id={id}
          className="font-display text-h2 sm:text-h1 text-ink leading-[1.05] tracking-tight m-0"
        >
          {title}
        </h1>
        <div className="h-5 mt-xs">
          {subtitle && (
            <p className="font-sans text-caption text-ink-3 m-0">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </header>
  );
}

export default memo(PageHeader);

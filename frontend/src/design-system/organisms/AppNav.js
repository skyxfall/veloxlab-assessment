import React, { memo } from 'react';
import { Link } from 'react-router-dom';

function AppNav() {
  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-40 border-b border-line bg-bg-surface/90 backdrop-blur supports-[backdrop-filter]:bg-bg-surface/75"
    >
      <div className="mx-auto max-w-container px-md sm:px-lg lg:px-xl h-nav flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-h4 font-semibold text-ink no-underline tracking-tight hover:text-ink-2"
        >
          Catalog
        </Link>
      </div>
    </nav>
  );
}

export default memo(AppNav);

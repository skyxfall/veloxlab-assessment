import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../atoms/Icon';

function BackBreadcrumb({ to = '/', label = 'Back' }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-xs h-7 px-xs -ml-xs font-sans text-label text-ink-3 uppercase tracking-[0.08em] no-underline rounded-none transition-colors duration-fast ease-standard hover:text-rose-ink hover:bg-rose-tint/60"
    >
      <Icon name="chevronLeft" size="sm" />
      <span>{label}</span>
    </Link>
  );
}

export default memo(BackBreadcrumb);

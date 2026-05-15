import React, { memo } from 'react';
import ProgressBar from '../atoms/ProgressBar';

function ListHeader() {
  return (
    <div className="flex items-center h-7 px-md sm:px-lg gap-md border-b border-line bg-bg-subtle text-label text-ink-4 uppercase tracking-[0.08em]">
      <div className="flex items-center gap-md flex-1 min-w-0">
        <span className="hidden sm:inline-block w-[88px] shrink-0">SKU</span>
        <span>Item</span>
      </div>
      <span className="hidden sm:inline-block w-[140px] text-left">Category</span>
      <span className="w-[88px] text-right">Price</span>
    </div>
  );
}

function ListShell({ children, height, isBusy = false }) {
  return (
    <div className="relative bg-bg-surface border border-line rounded-none overflow-hidden">
      {isBusy && <ProgressBar label="Updating list" />}
      <ListHeader />
      <div style={{ height }}>{children}</div>
    </div>
  );
}

export default memo(ListShell);

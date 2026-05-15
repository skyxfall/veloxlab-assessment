import React, { memo } from 'react';

function ScrollPosition({ start, stop, total }) {
  return (
    <p className="font-sans text-caption text-ink-3 tabular-nums m-0">
      Viewing{' '}
      <span className="font-medium text-ink-2">
        {start.toLocaleString()}–{stop.toLocaleString()}
      </span>{' '}
      of <span className="font-medium text-ink-2">{total.toLocaleString()}</span>
    </p>
  );
}

export default memo(ScrollPosition);

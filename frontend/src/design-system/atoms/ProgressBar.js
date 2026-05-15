import React, { memo } from 'react';

function ProgressBar({ label = 'Loading' }) {
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-busy="true"
      className="ds-progress-track"
    />
  );
}

export default memo(ProgressBar);

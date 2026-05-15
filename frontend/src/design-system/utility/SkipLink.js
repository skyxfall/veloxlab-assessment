import React, { memo } from 'react';

function SkipLink() {
  return (
    <a
      href="#main"
      className="absolute -left-[9999px] top-0 bg-ink text-ink-invert font-sans text-label-lg px-md py-xs z-50 focus:left-md focus:top-md"
    >
      Skip to content
    </a>
  );
}

export default memo(SkipLink);

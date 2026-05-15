import React, { memo } from 'react';

const PATHS = {
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M20 20l-5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </>
  ),
  arrowLeft: (
    <path
      d="M14 6l-6 6 6 6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  arrowRight: (
    <path
      d="M10 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  chevronLeft: (
    <path
      d="M15 6l-6 6 6 6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  chevronRight: (
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  close: (
    <path
      d="M7 7l10 10M17 7L7 17"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  ),
};

const SIZES = { sm: 14, md: 18, lg: 22 };

function Icon({ name, size = 'md', className }) {
  const dimension = SIZES[size];
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width={dimension}
      height={dimension}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      {PATHS[name]}
    </svg>
  );
}

export default memo(Icon);

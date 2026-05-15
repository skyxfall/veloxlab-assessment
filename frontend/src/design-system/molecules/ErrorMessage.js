import React, { memo } from 'react';

function ErrorMessage({ id, message }) {
  return (
    <div
      id={id}
      role="alert"
      className="border-l-2 border-status-err bg-status-err-bg/40 text-status-err font-sans text-label-lg px-md py-sm mb-md"
    >
      {message}
    </div>
  );
}

export default memo(ErrorMessage);

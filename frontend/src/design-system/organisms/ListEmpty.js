import React, { memo } from 'react';
import ListShell from './ListShell';

function ListEmpty({ height, title = 'No results', description }) {
  return (
    <ListShell height={height}>
      <div className="h-full flex flex-col items-center justify-center text-center px-lg">
        <p className="font-display text-h3 text-ink m-0">{title}</p>
        {description && (
          <p className="font-sans text-body text-ink-3 mt-xs mb-0 max-w-md">{description}</p>
        )}
      </div>
    </ListShell>
  );
}

export default memo(ListEmpty);

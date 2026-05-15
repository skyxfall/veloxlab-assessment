import React, { memo } from 'react';

function ResultsMeta({ query, length, total, unit = 'items' }) {
  if (query) {
    if (length === 0) {
      return (
        <p className="font-sans text-body text-ink-3 m-0">
          No results for{' '}
          <span className="font-display italic text-h4 text-ink">“{query}”</span>
        </p>
      );
    }
    return (
      <p className="font-sans text-body text-ink-3 m-0 flex items-baseline gap-xs flex-wrap">
        <span className="font-display text-h2 text-rose-ink tabular-nums leading-none">
          {length.toLocaleString()}
        </span>
        <span>{length === 1 ? 'result' : 'results'} for</span>
        <span className="font-display italic text-h4 text-ink">“{query}”</span>
      </p>
    );
  }
  return (
    <p className="font-sans text-body text-ink-3 m-0 flex items-baseline gap-xs">
      <span className="font-display text-h2 text-ink tabular-nums leading-none">
        {total.toLocaleString()}
      </span>
      <span>{unit}</span>
    </p>
  );
}

export default memo(ResultsMeta);

import React, { memo, useCallback } from 'react';
import Icon from '../atoms/Icon';

function SearchField({ value, onChange, placeholder = 'Search…', label = 'Search' }) {
  const handleChange = useCallback(
    (event) => onChange(event.target.value),
    [onChange],
  );

  const handleClear = useCallback(() => onChange(''), [onChange]);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape' && value) {
        event.preventDefault();
        onChange('');
      }
    },
    [value, onChange],
  );

  const hasValue = value.length > 0;

  return (
    <search role="search" className="relative w-full sm:w-80">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-3">
        <Icon name="search" size="md" />
      </span>
      <label className="block">
        <span className="sr-only">{label}</span>
        <input
          type="search"
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          aria-label={label}
          autoComplete="off"
          spellCheck="false"
          enterKeyHint="search"
          className="w-full h-11 bg-bg-surface border border-line rounded-none pl-10 pr-10 font-sans text-body text-ink placeholder:text-ink-4 transition-colors duration-fast ease-standard hover:border-ink-3 focus:border-ink focus:outline-none"
        />
      </label>
      {hasValue && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-4 h-4 rounded-pill bg-ink-3 text-white cursor-pointer transition-colors duration-fast ease-standard hover:bg-ink"
        >
          <Icon name="close" size="sm" />
        </button>
      )}
    </search>
  );
}

export default memo(SearchField);

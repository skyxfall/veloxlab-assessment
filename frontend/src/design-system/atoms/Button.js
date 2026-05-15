import React, { memo, forwardRef } from 'react';
import { cn } from '../utils/cn';

const VARIANTS = {
  primary:
    'bg-ink text-ink-invert hover:bg-ink-2 border border-ink',
  secondary:
    'bg-bg-surface text-ink border border-line hover:bg-bg-subtle hover:border-ink-4',
  ghost:
    'bg-transparent text-ink-2 border border-transparent hover:text-ink hover:bg-bg-subtle',
};

const SIZES = {
  sm: 'h-8 px-sm text-label',
  md: 'h-9 px-md text-body',
};

const BASE =
  'inline-flex items-center justify-center gap-xs font-sans font-medium rounded-none transition-colors duration-fast ease-standard disabled:opacity-40 disabled:cursor-not-allowed';

const Button = forwardRef(function Button(
  { variant = 'secondary', size = 'md', type = 'button', className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
});

export default memo(Button);

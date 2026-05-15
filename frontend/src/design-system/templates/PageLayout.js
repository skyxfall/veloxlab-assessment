import React, { memo } from 'react';
import { cn } from '../utils/cn';

function PageLayout({ as: Component = 'main', children, className, ...rest }) {
  return (
    <Component
      className={cn(
        'mx-auto max-w-container px-md sm:px-lg lg:px-xl py-xl sm:py-xxl',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default memo(PageLayout);

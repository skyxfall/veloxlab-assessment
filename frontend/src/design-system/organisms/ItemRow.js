import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import Badge from '../atoms/Badge';
import { variantForCategory } from '../utils/badgeVariant';

const ROW =
  'group flex items-center h-full px-md sm:px-lg gap-md text-ink no-underline border-b border-line-2 transition-colors duration-fast ease-standard hover:bg-rose-tint/45';

function ItemRow({ index, style, data }) {
  const item = data[index];
  return (
    <li role="listitem" style={style} className="list-none">
      <Link to={`/items/${item.id}`} state={{ item }} className={ROW}>
        <div className="flex items-center gap-md min-w-0 flex-1">
          <span className="hidden sm:inline-flex items-center justify-center w-[88px] h-7 bg-bg-subtle border border-line text-ink-3 font-mono text-label-sm tabular-nums tracking-[0.04em] shrink-0">
            SKU-{String(item.id).padStart(4, '0')}
          </span>
          <div className="min-w-0 flex flex-col">
            <span className="font-sans font-medium text-h4 text-ink truncate">
              {item.name}
            </span>
            <span className="text-caption text-ink-3 sm:hidden truncate">
              {item.category}
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center w-[140px]">
          <Badge dot variant={variantForCategory(item.category)}>
            {item.category}
          </Badge>
        </div>
        <span className="font-display text-h4 text-ink tabular-nums w-[88px] text-right">
          ${item.price.toLocaleString()}
        </span>
      </Link>
    </li>
  );
}

export default memo(ItemRow);

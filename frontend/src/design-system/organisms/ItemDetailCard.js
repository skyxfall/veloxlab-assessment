import React, { memo } from 'react';
import Badge from '../atoms/Badge';
import { variantForCategory } from '../utils/badgeVariant';

function ItemDetailCard({ item }) {
  return (
    <article
      aria-labelledby="detail-heading"
      className="bg-bg-surface border border-line rounded-none p-xl sm:p-xxl min-h-[220px]"
    >
      <div className="flex items-center gap-sm mb-md">
        <span className="inline-flex items-center px-xs h-7 bg-bg-subtle border border-line text-ink-3 font-mono text-label-sm tabular-nums tracking-[0.04em]">
          SKU-{String(item.id).padStart(4, '0')}
        </span>
        <Badge dot variant={variantForCategory(item.category)}>
          {item.category}
        </Badge>
      </div>
      <dl className="grid grid-cols-[max-content_1fr] gap-x-lg gap-y-sm">
        <dt className="font-sans text-body text-ink-3">Category</dt>
        <dd className="font-sans text-body text-ink m-0">{item.category}</dd>
        <dt className="font-sans text-body text-ink-3">Price</dt>
        <dd className="font-display text-h3 text-rose-ink tabular-nums m-0">
          ${item.price.toLocaleString()}
        </dd>
      </dl>
    </article>
  );
}

export default memo(ItemDetailCard);

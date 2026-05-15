import React, { useCallback, useState } from 'react';
import PageLayout from '../design-system/templates/PageLayout';
import PageHeader from '../design-system/molecules/PageHeader';
import SearchField from '../design-system/molecules/SearchField';
import ResultsMeta from '../design-system/molecules/ResultsMeta';
import ScrollPosition from '../design-system/molecules/ScrollPosition';
import ErrorMessage from '../design-system/molecules/ErrorMessage';
import ItemList from '../design-system/organisms/ItemList';
import ListSkeleton from '../design-system/organisms/ListSkeleton';
import ListEmpty from '../design-system/organisms/ListEmpty';
import useItemsPage from '../hooks/useItemsPage';
import useDocumentMeta from '../hooks/useDocumentMeta';
import { LIST_VIEWPORT, ROW_HEIGHT, VISIBLE_ROWS } from '../constants/items';

const PAGE_META = {
  title: 'Item Catalog — Browse Items',
  description: 'Browse and search a catalog of items by name, category, and price.',
};

function Items() {
  const {
    items,
    total,
    isLoading,
    isBusy,
    error,
    query,
    setQuery,
    appliedQuery,
  } = useItemsPage();

  useDocumentMeta(PAGE_META);

  const [range, setRange] = useState({ start: 0, stop: VISIBLE_ROWS - 1 });
  const handleRange = useCallback((next) => setRange(next), []);

  const showSkeleton = isLoading && items.length === 0;
  const showEmpty = !isLoading && items.length === 0;
  const showRange = items.length > VISIBLE_ROWS;

  const visibleStart = items.length === 0 ? 0 : range.start + 1;
  const visibleStop = items.length === 0 ? 0 : Math.min(range.stop + 1, items.length);

  return (
    <PageLayout aria-labelledby="items-heading">
      <PageHeader
        id="items-heading"
        title="Item Catalog"
        actions={
          <SearchField
            value={query}
            onChange={setQuery}
            isBusy={isBusy}
            placeholder="Search items…"
            label="Search items by name"
          />
        }
      />

      {error && <ErrorMessage message={`Failed to load items: ${error.message}`} />}

      <div className="flex flex-wrap items-end justify-between gap-md mb-sm">
        <ResultsMeta
          query={appliedQuery}
          length={items.length}
          total={total}
          unit="items"
        />
        {showRange && (
          <ScrollPosition start={visibleStart} stop={visibleStop} total={items.length} />
        )}
      </div>

      <section aria-labelledby="items-heading" aria-busy={isLoading}>
        {showSkeleton ? (
          <ListSkeleton height={LIST_VIEWPORT} rowHeight={ROW_HEIGHT} />
        ) : showEmpty ? (
          <ListEmpty
            height={LIST_VIEWPORT}
            title={appliedQuery ? 'No matches' : 'No items'}
            description={
              appliedQuery
                ? `We couldn't find any items matching “${appliedQuery}”.`
                : 'There are no items in the catalog yet.'
            }
          />
        ) : (
          <ItemList
            items={items}
            height={LIST_VIEWPORT}
            rowHeight={ROW_HEIGHT}
            isBusy={isBusy}
            onVisibleRangeChange={handleRange}
          />
        )}
      </section>
    </PageLayout>
  );
}

export default Items;

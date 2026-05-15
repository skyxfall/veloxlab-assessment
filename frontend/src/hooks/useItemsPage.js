import { useEffect, useState } from 'react';
import { useItemsActions, useItemsState } from '../state/DataContext';
import useDebouncedValue from './useDebouncedValue';
import { SEARCH_DEBOUNCE_MS, TOTAL_LIMIT } from '../constants/items';

export default function useItemsPage() {
  const { items, total, isLoading, error } = useItemsState();
  const { fetchItems } = useItemsActions();

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE_MS);

  const isPendingSearch = query !== debouncedQuery;
  const isBusy = isLoading || isPendingSearch;

  useEffect(() => {
    const controller = new AbortController();
    fetchItems({
      q: debouncedQuery,
      page: 1,
      limit: TOTAL_LIMIT,
      signal: controller.signal,
    }).catch((err) => {
      if (err.name !== 'AbortError') console.error(err);
    });
    return () => controller.abort();
  }, [debouncedQuery, fetchItems]);

  return {
    items,
    total,
    isLoading,
    isBusy,
    error,
    query,
    setQuery,
    appliedQuery: debouncedQuery,
  };
}

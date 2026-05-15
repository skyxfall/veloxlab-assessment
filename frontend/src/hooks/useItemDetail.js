import { useEffect, useState } from 'react';
import { fetchItemById } from '../services/items';

export default function useItemDetail(id) {
  const [item, setItem] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      try {
        const data = await fetchItemById(id, { signal: controller.signal });
        setItem(data);
      } catch (err) {
        if (err.name === 'AbortError') return;
        setError(err);
      }
    })();

    return () => controller.abort();
  }, [id]);

  return { item, error };
}

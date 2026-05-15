import { request, buildQuery } from './apiClient';

const ITEMS_ENDPOINT = '/api/items';

export function fetchItemsPage({ q = '', page = 1, limit = 50, signal } = {}) {
  return request(`${ITEMS_ENDPOINT}${buildQuery({ q, page, limit })}`, { signal });
}

export function fetchItemById(id, { signal } = {}) {
  return request(`${ITEMS_ENDPOINT}/${encodeURIComponent(id)}`, { signal });
}

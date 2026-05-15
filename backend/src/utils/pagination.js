const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 10000;

function parsePositiveInt(value, fallback, max) {
  const n = Number.parseInt(value, 10);
  if (!Number.isFinite(n) || n <= 0) return fallback;
  return max ? Math.min(n, max) : n;
}

function parsePagination(query) {
  const limit = parsePositiveInt(query.limit, DEFAULT_LIMIT, MAX_LIMIT);
  const page = parsePositiveInt(query.page, 1);
  const offset = parsePositiveInt(query.offset, null) ?? (page - 1) * limit;
  return { limit, offset };
}

function paginate(items, { limit, offset }) {
  const total = items.length;
  const slice = items.slice(offset, offset + limit);
  return {
    items: slice,
    total,
    limit,
    offset,
    page: Math.floor(offset / limit) + 1,
    hasMore: offset + slice.length < total,
  };
}

module.exports = {
  DEFAULT_LIMIT,
  MAX_LIMIT,
  parsePositiveInt,
  parsePagination,
  paginate,
};

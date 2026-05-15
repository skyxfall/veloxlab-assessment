const { readItems, writeItems } = require('../utils/dataStore');
const { paginate } = require('../utils/pagination');
const { httpError } = require('../utils/httpError');
const { createMutex } = require('../utils/mutex');
const { invalidate: invalidateStats } = require('../utils/stats');

const withWriteLock = createMutex();
const INTEGER_ID = /^[1-9]\d*$/;

function filterByName(items, query) {
  if (typeof query !== 'string' || query.trim() === '') return items;
  const needle = query.trim().toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(needle));
}

function nextId(items) {
  return items.reduce((max, item) => (item.id > max ? item.id : max), 0) + 1;
}

function parseItemId(value) {
  const str = typeof value === 'string' ? value : String(value ?? '');
  if (!INTEGER_ID.test(str)) return null;
  return Number(str);
}

async function listItems({ q, limit, offset }) {
  const items = await readItems();
  return paginate(filterByName(items, q), { limit, offset });
}

async function getItemById(rawId) {
  const id = parseItemId(rawId);
  if (id === null) {
    throw httpError(404, 'Item not found');
  }
  const items = await readItems();
  const item = items.find((i) => i.id === id);
  if (!item) {
    throw httpError(404, 'Item not found');
  }
  return item;
}

function createItem(payload) {
  return withWriteLock(async () => {
    const items = await readItems();
    const newItem = { id: nextId(items), ...payload };
    items.push(newItem);
    await writeItems(items);
    invalidateStats();
    return newItem;
  });
}

module.exports = { listItems, getItemById, createItem };

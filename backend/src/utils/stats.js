const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const { DATA_PATH } = require('./dataStore');

let cachedStats = null;
let inFlight = null;
let watcher = null;

function computeStats(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return { total: 0, averagePrice: 0 };
  }
  let sum = 0;
  for (const item of items) {
    sum += Number(item.price) || 0;
  }
  return {
    total: items.length,
    averagePrice: sum / items.length,
  };
}

async function loadAndCacheStats() {
  if (inFlight) return inFlight;
  inFlight = (async () => {
    const raw = await fsp.readFile(DATA_PATH, 'utf-8');
    const items = JSON.parse(raw);
    cachedStats = { ...computeStats(items), computedAt: new Date().toISOString() };
    return cachedStats;
  })().finally(() => {
    inFlight = null;
  });
  return inFlight;
}

function invalidate() {
  cachedStats = null;
}

function startWatcher() {
  if (watcher) return;
  try {
    watcher = fs.watch(path.dirname(DATA_PATH), (eventType, filename) => {
      if (!filename || filename === path.basename(DATA_PATH)) {
        invalidate();
      }
    });
    watcher.on('error', () => {
      invalidate();
    });
  } catch (_err) {
    watcher = null;
  }
}

function stopWatcher() {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
}

async function getStats() {
  if (cachedStats) return cachedStats;
  startWatcher();
  return loadAndCacheStats();
}

module.exports = {
  getStats,
  invalidate,
  stopWatcher,
  computeStats,
};

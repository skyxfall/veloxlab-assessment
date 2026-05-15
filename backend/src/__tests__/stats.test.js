const request = require('supertest');
const { createApp } = require('../index');
const { stopWatcher, invalidate, computeStats } = require('../utils/stats');
const {
  backupDataFile,
  restoreDataFile,
  writeSampleData,
  SAMPLE_ITEMS,
} = require('./helpers');

let app;
let backupPath;

beforeAll(async () => {
  backupPath = await backupDataFile();
  app = createApp();
});

beforeEach(async () => {
  await writeSampleData();
  invalidate();
});

afterAll(async () => {
  stopWatcher();
  await restoreDataFile(backupPath);
});

describe('computeStats()', () => {
  test('returns zeros for empty input', () => {
    expect(computeStats([])).toEqual({ total: 0, averagePrice: 0 });
  });

  test('returns total and average price', () => {
    const stats = computeStats(SAMPLE_ITEMS);
    expect(stats.total).toBe(5);
    expect(stats.averagePrice).toBeCloseTo(1179, 0);
  });
});

describe('GET /api/stats', () => {
  test('returns stats for current items', async () => {
    const res = await request(app).get('/api/stats');
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(SAMPLE_ITEMS.length);
    expect(typeof res.body.averagePrice).toBe('number');
  });

  test('subsequent requests use cached value (same computedAt)', async () => {
    const first = await request(app).get('/api/stats');
    const second = await request(app).get('/api/stats');
    expect(first.body.computedAt).toBe(second.body.computedAt);
  });
});

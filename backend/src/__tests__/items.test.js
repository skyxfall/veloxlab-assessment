const request = require('supertest');
const { createApp } = require('../index');
const { stopWatcher, invalidate } = require('../utils/stats');
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

describe('GET /api/items', () => {
  test('returns paginated list with metadata', async () => {
    const res = await request(app).get('/api/items');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      total: SAMPLE_ITEMS.length,
      limit: 20,
      offset: 0,
      page: 1,
      hasMore: false,
    });
    expect(res.body.items).toHaveLength(SAMPLE_ITEMS.length);
  });

  test('filters items by search query (case-insensitive)', async () => {
    const res = await request(app).get('/api/items').query({ q: 'laptop' });
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(1);
    expect(res.body.items[0].name).toBe('Laptop Pro');
  });

  test('returns empty list when search has no matches', async () => {
    const res = await request(app).get('/api/items').query({ q: 'nonexistent' });
    expect(res.status).toBe(200);
    expect(res.body.total).toBe(0);
    expect(res.body.items).toEqual([]);
  });

  test('respects limit and page parameters', async () => {
    const res = await request(app).get('/api/items').query({ limit: 2, page: 2 });
    expect(res.status).toBe(200);
    expect(res.body.items).toHaveLength(2);
    expect(res.body.offset).toBe(2);
    expect(res.body.hasMore).toBe(true);
  });

  test('falls back to default limit when limit is invalid', async () => {
    const res = await request(app).get('/api/items').query({ limit: 'abc' });
    expect(res.status).toBe(200);
    expect(res.body.limit).toBe(20);
  });
});

describe('GET /api/items/:id', () => {
  test('returns single item by id', async () => {
    const res = await request(app).get('/api/items/1');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({ id: 1, name: 'Laptop Pro' });
  });

  test('returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/items/9999');
    expect(res.status).toBe(404);
    expect(res.body.error.message).toMatch(/not found/i);
  });

  test('returns 404 for non-numeric id', async () => {
    const res = await request(app).get('/api/items/not-a-number');
    expect(res.status).toBe(404);
  });

  test('returns 404 for ids with trailing junk (parseInt quirk)', async () => {
    const res = await request(app).get('/api/items/4eesadfsafsad');
    expect(res.status).toBe(404);
  });
});

describe('POST /api/items', () => {
  test('creates a new item with valid payload', async () => {
    const payload = { name: 'Wireless Mouse', category: 'Electronics', price: 49 };
    const res = await request(app).post('/api/items').send(payload);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject(payload);
    expect(typeof res.body.id).toBe('number');

    const list = await request(app).get('/api/items').query({ q: 'wireless mouse' });
    expect(list.body.items).toHaveLength(1);
  });

  test('rejects invalid payload (missing fields)', async () => {
    const res = await request(app).post('/api/items').send({ name: 'No Price' });
    expect(res.status).toBe(400);
    expect(res.body.error.message).toMatch(/category|price/);
  });

  test('rejects negative price', async () => {
    const res = await request(app)
      .post('/api/items')
      .send({ name: 'Bad', category: 'X', price: -1 });
    expect(res.status).toBe(400);
  });
});

describe('unknown routes', () => {
  test('returns 404 for unknown route', async () => {
    const res = await request(app).get('/api/does-not-exist');
    expect(res.status).toBe(404);
  });
});

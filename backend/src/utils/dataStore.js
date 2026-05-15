const fs = require('fs/promises');
const path = require('path');
const { randomUUID } = require('crypto');
const { httpError } = require('./httpError');

const DATA_PATH = path.join(__dirname, '../../../data/items.json');

async function readItems() {
  const raw = await fs.readFile(DATA_PATH, 'utf-8');
  try {
    return JSON.parse(raw);
  } catch (err) {
    throw httpError(500, `Data file is corrupted: ${err.message}`);
  }
}

async function writeItems(items) {
  const tmpPath = `${DATA_PATH}.${randomUUID()}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(items, null, 2));
  await fs.rename(tmpPath, DATA_PATH);
}

module.exports = { DATA_PATH, readItems, writeItems };

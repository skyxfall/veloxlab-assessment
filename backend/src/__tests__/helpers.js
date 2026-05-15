const fs = require('fs/promises');
const path = require('path');
const os = require('os');

const DATA_PATH = path.join(__dirname, '../../../data/items.json');

const SAMPLE_ITEMS = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 2499 },
  { id: 2, name: 'Noise Cancelling Headphones', category: 'Electronics', price: 399 },
  { id: 3, name: 'Ultra-Wide Monitor', category: 'Electronics', price: 999 },
  { id: 4, name: 'Ergonomic Chair', category: 'Furniture', price: 799 },
  { id: 5, name: 'Standing Desk', category: 'Furniture', price: 1199 },
];

async function backupDataFile() {
  try {
    const original = await fs.readFile(DATA_PATH, 'utf-8');
    const backupPath = path.join(os.tmpdir(), `items.backup.${process.pid}.json`);
    await fs.writeFile(backupPath, original);
    return backupPath;
  } catch (_err) {
    return null;
  }
}

async function restoreDataFile(backupPath) {
  if (!backupPath) return;
  const data = await fs.readFile(backupPath, 'utf-8');
  await fs.writeFile(DATA_PATH, data);
  await fs.unlink(backupPath).catch(() => {});
}

async function writeSampleData(items = SAMPLE_ITEMS) {
  await fs.writeFile(DATA_PATH, JSON.stringify(items, null, 2));
}

module.exports = {
  DATA_PATH,
  SAMPLE_ITEMS,
  backupDataFile,
  restoreDataFile,
  writeSampleData,
};

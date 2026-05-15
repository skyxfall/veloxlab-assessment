const express = require('express');
const fs = require('fs/promises');
const { DATA_PATH } = require('../utils/dataStore');

const router = express.Router();

router.get('/live', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

router.get('/ready', async (req, res) => {
  try {
    await fs.access(DATA_PATH);
    res.json({ status: 'ready' });
  } catch (err) {
    res.status(503).json({ status: 'not-ready', reason: err.message });
  }
});

module.exports = router;

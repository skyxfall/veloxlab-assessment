const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { getStats } = require('../utils/stats');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const stats = await getStats();
    res.json(stats);
  }),
);

module.exports = router;

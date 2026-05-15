const express = require('express');
const asyncHandler = require('../middleware/asyncHandler');
const { parsePagination } = require('../utils/pagination');
const { httpError } = require('../utils/httpError');
const { validateItemPayload, normalizeItemPayload } = require('../validators/itemValidator');
const itemsService = require('../services/itemsService');

const router = express.Router();

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { limit, offset } = parsePagination(req.query);
    const result = await itemsService.listItems({ q: req.query.q, limit, offset });
    res.json(result);
  }),
);

router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    const item = await itemsService.getItemById(req.params.id);
    res.json(item);
  }),
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const errors = validateItemPayload(req.body);
    if (errors.length > 0) {
      throw httpError(400, errors.join('; '));
    }
    const item = await itemsService.createItem(normalizeItemPayload(req.body));
    res.status(201).json(item);
  }),
);

module.exports = router;

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isNonNegativeNumber(value) {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0;
}

const RULES = [
  {
    field: 'name',
    check: isNonEmptyString,
    message: '"name" is required and must be a non-empty string',
  },
  {
    field: 'category',
    check: isNonEmptyString,
    message: '"category" is required and must be a non-empty string',
  },
  {
    field: 'price',
    check: isNonNegativeNumber,
    message: '"price" is required and must be a non-negative number',
  },
];

function validateItemPayload(body) {
  if (!body || typeof body !== 'object') {
    return ['Request body must be a JSON object'];
  }
  return RULES.filter((rule) => !rule.check(body[rule.field])).map((rule) => rule.message);
}

function normalizeItemPayload(body) {
  return {
    name: body.name.trim(),
    category: body.category.trim(),
    price: body.price,
  };
}

module.exports = { validateItemPayload, normalizeItemPayload };

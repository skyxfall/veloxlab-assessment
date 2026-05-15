const rateLimit = require('express-rate-limit');
const config = require('../config/env');

const writeLimiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  standardHeaders: true,
  legacyHeaders: false,
});

function limitWritesOnly(limiter) {
  return (req, res, next) => {
    const method = req.method.toUpperCase();
    if (method === 'GET' || method === 'HEAD' || method === 'OPTIONS') return next();
    return limiter(req, res, next);
  };
}

module.exports = {
  writeLimiter: limitWritesOnly(writeLimiter),
};

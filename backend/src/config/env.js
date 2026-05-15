function parseIntOr(value, fallback) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

const NODE_ENV = process.env.NODE_ENV || 'development';

const config = Object.freeze({
  NODE_ENV,
  isProduction: NODE_ENV === 'production',
  isTest: NODE_ENV === 'test',
  port: parseIntOr(process.env.PORT, 3001),
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  logLevel: process.env.LOG_LEVEL || (NODE_ENV === 'production' ? 'info' : 'debug'),
  jsonBodyLimit: process.env.JSON_BODY_LIMIT || '100kb',
  trustProxy: process.env.TRUST_PROXY || 'loopback',
  rateLimit: {
    windowMs: parseIntOr(process.env.RATE_LIMIT_WINDOW_MS, 60 * 1000),
    max: parseIntOr(process.env.RATE_LIMIT_MAX, 60),
  },
});

module.exports = config;

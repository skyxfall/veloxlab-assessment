const config = require('../config/env');

const notFound = (req, res, next) => {
  const err = new Error('Route Not Found');
  err.status = 404;
  next(err);
};

const errorHandler = (err, req, res, _next) => {
  const status = err.status || 500;
  if (status >= 500) {
    req.log?.error({ err }, 'request_failed');
  }
  const payload = {
    error: {
      message: err.message || 'Internal Server Error',
      status,
    },
  };
  if (!config.isProduction && err.stack) {
    payload.error.stack = err.stack;
  }
  res.status(status).json(payload);
};

module.exports = { notFound, errorHandler };

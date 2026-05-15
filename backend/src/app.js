const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');

const config = require('./config/env');
const requestId = require('./middleware/requestId');
const httpLogger = require('./middleware/httpLogger');
const { writeLimiter } = require('./middleware/rateLimiters');
const { notFound, errorHandler } = require('./middleware/errorHandler');
const itemsRouter = require('./routes/items');
const statsRouter = require('./routes/stats');
const healthRouter = require('./routes/health');

function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);

  app.use(requestId());
  if (!config.isTest) app.use(httpLogger());

  app.use(helmet());
  app.use(compression());
  app.use(cors({ origin: config.corsOrigin }));
  app.use(express.json({ limit: config.jsonBodyLimit }));

  app.use('/healthz', healthRouter);
  app.use('/api/items', writeLimiter, itemsRouter);
  app.use('/api/stats', statsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}

module.exports = { createApp };

const pino = require('pino');
const config = require('../config/env');

function buildTransport() {
  if (config.isProduction || config.isTest) return undefined;
  try {
    require.resolve('pino-pretty');
    return {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:standard' },
    };
  } catch (_err) {
    return undefined;
  }
}

const logger = pino({
  level: config.logLevel,
  base: { service: 'backend' },
  redact: ['req.headers.authorization', 'req.headers.cookie'],
  transport: buildTransport(),
});

module.exports = logger;

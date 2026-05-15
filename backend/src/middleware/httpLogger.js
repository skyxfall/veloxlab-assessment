const pinoHttp = require('pino-http');
const logger = require('../utils/logger');

module.exports = function httpLogger() {
  return pinoHttp({
    logger,
    genReqId: (req) => req.id,
    customLogLevel(_req, res, err) {
      if (err || res.statusCode >= 500) return 'error';
      if (res.statusCode >= 400) return 'warn';
      return 'info';
    },
  });
};

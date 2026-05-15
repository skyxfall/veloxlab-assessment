const { createApp } = require('./app');
const config = require('./config/env');
const logger = require('./utils/logger');
const { stopWatcher } = require('./utils/stats');

const app = createApp();
const server = app.listen(config.port, () => {
  logger.info({ port: config.port, env: config.NODE_ENV }, 'server_started');
});

server.headersTimeout = 65 * 1000;
server.keepAliveTimeout = 60 * 1000;
server.requestTimeout = 30 * 1000;

const SHUTDOWN_TIMEOUT_MS = 10 * 1000;
let shuttingDown = false;

function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, 'shutdown_initiated');

  const forceExit = setTimeout(() => {
    logger.warn('shutdown_force_exit');
    process.exit(1);
  }, SHUTDOWN_TIMEOUT_MS);
  forceExit.unref();

  server.close((err) => {
    stopWatcher();
    if (err) {
      logger.error({ err }, 'shutdown_error');
      process.exit(1);
    }
    logger.info('shutdown_complete');
    process.exit(0);
  });
}

['SIGINT', 'SIGTERM'].forEach((signal) => process.on(signal, () => shutdown(signal)));

process.on('unhandledRejection', (reason) => {
  logger.error({ reason }, 'unhandled_rejection');
});

process.on('uncaughtException', (err) => {
  logger.fatal({ err }, 'uncaught_exception');
  shutdown('uncaughtException');
});

module.exports = server;

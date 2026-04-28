'use strict';

const logger = require('../utils/logger');

/**
 * Centralised error handler middleware.
 * Must be registered last in app.js.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const message = status < 500 ? err.message : 'Internal Server Error';

  if (status >= 500) {
    logger.error('Unhandled error', { message: err.message, stack: err.stack });
  }

  return res.status(status).json({
    error: {
      status,
      message,
    },
  });
};

module.exports = errorHandler;

'use strict';

/**
 * Wraps an async route handler to forward errors to Express error middleware.
 * Usage: router.get('/path', asyncHandler(myController.method))
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;

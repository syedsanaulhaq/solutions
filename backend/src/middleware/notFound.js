'use strict';

/**
 * 404 handler — catches requests that did not match any route.
 */
const notFound = (req, res) => {
  return res.status(404).json({
    error: {
      status: 404,
      message: `Route ${req.method} ${req.originalUrl} not found`,
    },
  });
};

module.exports = notFound;

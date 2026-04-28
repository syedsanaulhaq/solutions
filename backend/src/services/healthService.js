'use strict';

/**
 * Returns the current health status of the service.
 * Extend this to include DB connectivity, dependency checks, etc.
 */
const getStatus = async () => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '0.1.0',
  };
};

module.exports = { getStatus };

'use strict';

const healthService = require('../services/healthService');

/**
 * GET /api/health
 * Returns service health status.
 */
const getHealth = async (req, res, next) => {
  try {
    const status = await healthService.getStatus();
    const httpStatus = status.status === 'ok' ? 200 : 503;
    return res.status(httpStatus).json(status);
  } catch (err) {
    return next(err);
  }
};

module.exports = { getHealth };

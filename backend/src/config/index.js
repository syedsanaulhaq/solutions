'use strict';

module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  db: {
    url: process.env.DATABASE_URL,
  },
  logLevel: process.env.LOG_LEVEL || 'info',
};

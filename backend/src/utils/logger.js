'use strict';

const config = require('../config');

const levels = ['error', 'warn', 'info', 'debug'];
const activeLevel = levels.indexOf(config.logLevel);

const format = (level, message, meta) => {
  const entry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(meta && Object.keys(meta).length ? { meta } : {}),
  };
  return JSON.stringify(entry);
};

const log = (level, message, meta = {}) => {
  if (levels.indexOf(level) > activeLevel) return;
  const line = format(level, message, meta);
  if (level === 'error') {
    process.stderr.write(line + '\n');
  } else {
    process.stdout.write(line + '\n');
  }
};

const logger = {
  error: (msg, meta) => log('error', msg, meta),
  warn:  (msg, meta) => log('warn',  msg, meta),
  info:  (msg, meta) => log('info',  msg, meta),
  debug: (msg, meta) => log('debug', msg, meta),
};

module.exports = logger;

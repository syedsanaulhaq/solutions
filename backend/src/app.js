'use strict';

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const config = require('./config');
const routes = require('./api');
const errorHandler = require('./middleware/errorHandler');
const notFound = require('./middleware/notFound');

const app = express();

// Security headers
app.use(helmet());

// CORS
app.use(cors({ origin: config.corsOrigin, credentials: true }));

// Request logging
if (config.env !== 'test') {
  app.use(morgan('combined'));
}

// Body parsing
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Disable x-powered-by
app.disable('x-powered-by');

// Routes
app.use('/api', routes);

// 404 handler
app.use(notFound);

// Centralised error handler (must be last)
app.use(errorHandler);

module.exports = app;

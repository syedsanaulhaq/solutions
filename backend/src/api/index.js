'use strict';

const { Router } = require('express');
const healthRouter = require('./routes/health');
const usersRouter = require('./routes/users');

const router = Router();

router.use('/health', healthRouter);
router.use('/users', usersRouter);

module.exports = router;

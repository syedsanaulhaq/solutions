'use strict';

const { Router } = require('express');
const { body, param } = require('express-validator');
const usersController = require('../../controllers/usersController');
const asyncHandler = require('../../utils/asyncHandler');

const router = Router();

const userIdParam = param('id').isUUID(4).withMessage('id must be a valid UUID');

const createUserBody = [
  body('email').isEmail().normalizeEmail().withMessage('email must be a valid email address'),
  body('name').isString().trim().isLength({ min: 1, max: 255 }).withMessage('name is required and must be at most 255 characters'),
];

const updateUserBody = [
  body('email').optional().isEmail().normalizeEmail().withMessage('email must be a valid email address'),
  body('name').optional().isString().trim().isLength({ min: 1, max: 255 }).withMessage('name must be at most 255 characters'),
];

// GET /api/users
router.get('/', asyncHandler(usersController.listUsers));

// GET /api/users/:id
router.get('/:id', userIdParam, asyncHandler(usersController.getUser));

// POST /api/users
router.post('/', createUserBody, asyncHandler(usersController.createUser));

// PATCH /api/users/:id
router.patch('/:id', [userIdParam, ...updateUserBody], asyncHandler(usersController.updateUser));

// DELETE /api/users/:id
router.delete('/:id', userIdParam, asyncHandler(usersController.deleteUser));

module.exports = router;

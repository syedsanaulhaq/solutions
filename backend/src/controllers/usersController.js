'use strict';

const { validationResult } = require('express-validator');
const usersService = require('../services/usersService');

/**
 * Reads express-validator errors and throws a 400 if any exist.
 */
const validate = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = new Error('Validation failed');
    err.status = 400;
    err.details = errors.array();
    throw err;
  }
};

/**
 * GET /api/users
 */
const listUsers = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const result = await usersService.listUsers({ page: Number(page), limit: Math.min(Number(limit), 100) });
  return res.status(200).json(result);
};

/**
 * GET /api/users/:id
 */
const getUser = async (req, res) => {
  validate(req);
  const user = await usersService.getUserById(req.params.id);
  return res.status(200).json(user);
};

/**
 * POST /api/users
 */
const createUser = async (req, res) => {
  validate(req);
  const user = await usersService.createUser(req.body);
  return res.status(201).json(user);
};

/**
 * PATCH /api/users/:id
 */
const updateUser = async (req, res) => {
  validate(req);
  const user = await usersService.updateUser(req.params.id, req.body);
  return res.status(200).json(user);
};

/**
 * DELETE /api/users/:id
 */
const deleteUser = async (req, res) => {
  validate(req);
  await usersService.deleteUser(req.params.id);
  return res.status(204).send();
};

module.exports = { listUsers, getUser, createUser, updateUser, deleteUser };

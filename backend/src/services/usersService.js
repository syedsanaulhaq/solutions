'use strict';

/**
 * In-memory store — replace with real DB queries (e.g. Prisma / pg) when the
 * database layer is wired up.
 */
let store = [];
let nextId = 1;

const _makeId = () => {
  // Placeholder UUID-like id; swap for db-generated UUID in production.
  return `00000000-0000-4000-8000-${String(nextId++).padStart(12, '0')}`;
};

/**
 * @param {{ page: number, limit: number }} options
 * @returns {{ data: object[], meta: { page: number, limit: number, total: number } }}
 */
const listUsers = async ({ page = 1, limit = 20 } = {}) => {
  const start = (page - 1) * limit;
  return {
    data: store.slice(start, start + limit),
    meta: { page, limit, total: store.length },
  };
};

/**
 * @param {string} id
 * @returns {object}
 * @throws {Error} 404 if not found
 */
const getUserById = async (id) => {
  const user = store.find((u) => u.id === id);
  if (!user) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  return user;
};

/**
 * @param {{ email: string, name: string }} data
 * @returns {object}
 */
const createUser = async ({ email, name }) => {
  const existing = store.find((u) => u.email === email);
  if (existing) {
    const err = new Error('A user with this email already exists');
    err.status = 409;
    throw err;
  }
  const now = new Date().toISOString();
  const user = { id: _makeId(), email, name, createdAt: now, updatedAt: now };
  store.push(user);
  return user;
};

/**
 * @param {string} id
 * @param {{ email?: string, name?: string }} data
 * @returns {object}
 */
const updateUser = async (id, data) => {
  const user = await getUserById(id);
  if (data.email && data.email !== user.email) {
    const conflict = store.find((u) => u.email === data.email);
    if (conflict) {
      const err = new Error('A user with this email already exists');
      err.status = 409;
      throw err;
    }
  }
  Object.assign(user, data, { updatedAt: new Date().toISOString() });
  return user;
};

/**
 * @param {string} id
 */
const deleteUser = async (id) => {
  const index = store.findIndex((u) => u.id === id);
  if (index === -1) {
    const err = new Error('User not found');
    err.status = 404;
    throw err;
  }
  store.splice(index, 1);
};

module.exports = { listUsers, getUserById, createUser, updateUser, deleteUser };

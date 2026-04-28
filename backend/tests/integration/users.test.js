'use strict';

const request = require('supertest');
const app = require('../../src/app');

describe('Users API', () => {
  // ── helpers ──────────────────────────────────────────────────────────────
  const validPayload = { email: 'alice@example.com', name: 'Alice' };
  let createdId;

  // ── POST /api/users ───────────────────────────────────────────────────────
  describe('POST /api/users', () => {
    it('creates a user and returns 201', async () => {
      const res = await request(app).post('/api/users').send(validPayload);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ email: 'alice@example.com', name: 'Alice' });
      expect(res.body.id).toBeDefined();
      createdId = res.body.id;
    });

    it('returns 400 when email is missing', async () => {
      const res = await request(app).post('/api/users').send({ name: 'Bob' });
      expect(res.status).toBe(400);
    });

    it('returns 400 when email is invalid', async () => {
      const res = await request(app).post('/api/users').send({ email: 'not-an-email', name: 'Bob' });
      expect(res.status).toBe(400);
    });

    it('returns 409 when email already exists', async () => {
      const res = await request(app).post('/api/users').send(validPayload);
      expect(res.status).toBe(409);
    });
  });

  // ── GET /api/users ────────────────────────────────────────────────────────
  describe('GET /api/users', () => {
    it('returns 200 with data + meta', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.meta).toMatchObject({ page: 1, limit: 20 });
    });
  });

  // ── GET /api/users/:id ────────────────────────────────────────────────────
  describe('GET /api/users/:id', () => {
    it('returns 200 with the user', async () => {
      const res = await request(app).get(`/api/users/${createdId}`);
      expect(res.status).toBe(200);
      expect(res.body.id).toBe(createdId);
    });

    it('returns 400 for a non-UUID id', async () => {
      const res = await request(app).get('/api/users/not-a-uuid');
      expect(res.status).toBe(400);
    });

    it('returns 404 for an unknown UUID', async () => {
      const res = await request(app).get('/api/users/00000000-0000-4000-8000-000000000000');
      expect(res.status).toBe(404);
    });
  });

  // ── PATCH /api/users/:id ──────────────────────────────────────────────────
  describe('PATCH /api/users/:id', () => {
    it('updates the user and returns 200', async () => {
      const res = await request(app).patch(`/api/users/${createdId}`).send({ name: 'Alice Updated' });
      expect(res.status).toBe(200);
      expect(res.body.name).toBe('Alice Updated');
    });

    it('returns 400 for a non-UUID id', async () => {
      const res = await request(app).patch('/api/users/bad-id').send({ name: 'X' });
      expect(res.status).toBe(400);
    });
  });

  // ── DELETE /api/users/:id ─────────────────────────────────────────────────
  describe('DELETE /api/users/:id', () => {
    it('deletes the user and returns 204', async () => {
      const res = await request(app).delete(`/api/users/${createdId}`);
      expect(res.status).toBe(204);
    });

    it('returns 404 after deletion', async () => {
      const res = await request(app).get(`/api/users/${createdId}`);
      expect(res.status).toBe(404);
    });
  });
});

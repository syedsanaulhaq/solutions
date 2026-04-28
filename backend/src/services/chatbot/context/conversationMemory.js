'use strict';

/**
 * In-memory conversation memory store.
 *
 * Each session holds an ordered array of { role, content } message objects.
 * Replace the Map with Redis, DynamoDB, or a DB table for persistence across
 * process restarts and horizontal scaling.
 *
 * @typedef {{ role: 'user'|'assistant'|'system', content: string }} Message
 */

/** @type {Map<string, Message[]>} */
const store = new Map();

const MAX_MESSAGES_DEFAULT = 40; // hard cap before compaction

/**
 * Loads the full conversation history for a session.
 * Returns an empty array for unknown sessions.
 *
 * @param {string} sessionId
 * @returns {Promise<Message[]>}
 */
const load = async (sessionId) => {
  return store.get(sessionId) ?? [];
};

/**
 * Appends a single message to a session's history.
 * Creates the session record if it does not exist.
 *
 * @param {string}  sessionId
 * @param {Message} message
 * @param {number}  [maxMessages]
 */
const append = async (sessionId, message, maxMessages = MAX_MESSAGES_DEFAULT) => {
  const history = store.get(sessionId) ?? [];
  history.push(message);

  // Drop oldest messages (pairs) when the cap is exceeded
  while (history.length > maxMessages) {
    history.shift();
  }

  store.set(sessionId, history);
};

/**
 * Clears conversation history for a session.
 * @param {string} sessionId
 */
const clear = async (sessionId) => {
  store.delete(sessionId);
};

module.exports = { load, append, clear };

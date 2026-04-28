'use strict';

/**
 * Trims a conversation history array to fit within a character budget.
 *
 * Strategy: drop the oldest messages (excluding any system message at index 0)
 * until the total character count of all remaining messages falls below the budget.
 * This is a lightweight approximation — swap with a tiktoken-based token counter
 * for precise OpenAI token budgeting.
 *
 * @param {Array<{ role: string, content: string }>} history
 * @param {number} [maxChars=12000]
 * @returns {Array<{ role: string, content: string }>}
 */
const trim = (history, maxChars = 12_000) => {
  if (!history.length) return history;

  // Preserve a leading system message if present
  const hasSystem = history[0]?.role === 'system';
  const system = hasSystem ? [history[0]] : [];
  let messages = hasSystem ? history.slice(1) : [...history];

  const totalChars = (msgs) => msgs.reduce((sum, m) => sum + m.content.length, 0);

  while (messages.length > 0 && totalChars([...system, ...messages]) > maxChars) {
    messages.shift();
  }

  return [...system, ...messages];
};

module.exports = { trim };

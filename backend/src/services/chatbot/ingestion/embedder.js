'use strict';

const logger = require('../../../utils/logger');

/**
 * Generates vector embeddings for an array of text strings.
 *
 * Currently calls the OpenAI Embeddings API (text-embedding-3-small).
 * Swap the implementation for any other provider (Cohere, local model, etc.)
 * without changing the interface.
 *
 * @param {string[]} texts - Array of text strings to embed.
 * @returns {Promise<number[][]>}  Array of embedding vectors (one per input text).
 */
const embed = async (texts) => {
  if (!texts.length) return [];

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  logger.info('Generating embeddings', { count: texts.length });

  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: process.env.EMBEDDING_MODEL || 'text-embedding-3-small',
      input: texts,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Embeddings API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  return data.data.map((item) => item.embedding);
};

module.exports = { embed };

'use strict';

const promptBuilder = require('./promptBuilder');
const llmClient = require('./llmClient');
const logger = require('../../../utils/logger');

/**
 * Generates a grounded answer from retrieved context chunks and conversation history.
 *
 * @param {object} params
 * @param {string}   params.query    - The user's question.
 * @param {object[]} params.chunks   - Retrieved context chunks from the vector store.
 * @param {object[]} [params.history] - Trimmed conversation history.
 * @param {object}   [params.options] - LLM overrides (model, temperature, maxTokens).
 * @returns {Promise<{ answer: string, usage: object }>}
 */
const generate = async ({ query, chunks, history = [], options = {} }) => {
  const { systemPrompt, messages } = promptBuilder.build({ query, chunks, history });

  const { content, usage } = await llmClient.complete({ systemPrompt, messages, options });
  logger.info('Generation complete', { tokensUsed: usage?.total_tokens });

  return { answer: content, usage };
};

module.exports = { generate };

'use strict';

const retriever = require('./retrieval');
const generator = require('./generation');
const contextManager = require('./context');
const logger = require('../../utils/logger');

/**
 * Executes the full RAG pipeline for a single user turn.
 *
 * Flow: context window → embed query → retrieve chunks → build prompt → generate → update memory
 *
 * @param {object} params
 * @param {string}   params.sessionId   - Conversation session identifier.
 * @param {string}   params.query       - The user's input message.
 * @param {object}   [params.options]   - Optional overrides (topK, temperature, etc.).
 * @returns {Promise<{ answer: string, sources: object[], sessionId: string }>}
 */
const run = async ({ sessionId, query, options = {} }) => {
  logger.info('RAG pipeline started', { sessionId, queryLength: query.length });

  // 1. Load conversation history and trim to token budget
  const history = await contextManager.conversationMemory.load(sessionId);
  const trimmedHistory = contextManager.contextWindow.trim(history, options.maxHistoryTokens);

  // 2. Retrieve relevant chunks from the vector store
  const chunks = await retriever.retrieve(query, { topK: options.topK ?? 5 });
  logger.info('Chunks retrieved', { sessionId, count: chunks.length });

  // 3. Build prompt and generate a response
  const { answer, usage } = await generator.generate({
    query,
    chunks,
    history: trimmedHistory,
    options,
  });

  // 4. Persist the new turn to conversation memory
  await contextManager.conversationMemory.append(sessionId, { role: 'user', content: query });
  await contextManager.conversationMemory.append(sessionId, { role: 'assistant', content: answer });

  logger.info('RAG pipeline complete', { sessionId, tokensUsed: usage?.total_tokens });

  return {
    answer,
    sources: chunks.map((c) => ({ id: c.id, source: c.metadata?.source, score: c.score })),
    sessionId,
  };
};

module.exports = { run };

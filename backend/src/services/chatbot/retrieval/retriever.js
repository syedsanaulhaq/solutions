'use strict';

const embedder = require('../ingestion/embedder');
const vectorStore = require('./vectorStore');
const reranker = require('./reranker');
const logger = require('../../../utils/logger');

/**
 * Embeds the query and retrieves the most relevant chunks from the vector store.
 *
 * @param {string} query
 * @param {object} [options]
 * @param {number}  [options.topK=5]           - Number of chunks to retrieve before reranking.
 * @param {boolean} [options.rerank=false]      - Apply cross-encoder reranking after retrieval.
 * @param {number}  [options.rerankTopK=3]      - Final number of chunks after reranking.
 * @returns {Promise<Array<{ id: string, text: string, score: number, metadata: object }>>}
 */
const retrieve = async (query, options = {}) => {
  const { topK = 5, rerank = false, rerankTopK = 3 } = options;

  logger.info('Retrieval started', { topK, rerank });

  const [queryEmbedding] = await embedder.embed([query]);
  let chunks = await vectorStore.query(queryEmbedding, topK);

  if (rerank && chunks.length > 0) {
    chunks = await reranker.rerank(query, chunks, rerankTopK);
    logger.info('Reranking applied', { rerankTopK });
  }

  return chunks;
};

module.exports = { retrieve };

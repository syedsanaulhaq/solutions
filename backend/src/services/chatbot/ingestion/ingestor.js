'use strict';

const loader = require('./loader');
const chunker = require('./chunker');
const embedder = require('./embedder');
const vectorStore = require('../retrieval/vectorStore');
const logger = require('../../../utils/logger');

/**
 * Full ingestion pipeline: load → chunk → embed → upsert into vector store.
 *
 * @param {object} source           - Document source descriptor (see loader.js).
 * @param {object} [options]
 * @param {number} [options.chunkSize]
 * @param {number} [options.chunkOverlap]
 * @returns {Promise<{ chunksIngested: number }>}
 */
const ingest = async (source, options = {}) => {
  logger.info('Ingestion started', { sourceType: source.type });

  const { text, metadata } = await loader.load(source);
  const texts = chunker.chunk(text, options);
  logger.info('Document chunked', { chunks: texts.length });

  const embeddings = await embedder.embed(texts);

  const documents = texts.map((t, i) => ({
    id: `${metadata.source}-${i}`,
    text: t,
    embedding: embeddings[i],
    metadata,
  }));

  await vectorStore.upsert(documents);
  logger.info('Ingestion complete', { chunksIngested: documents.length });

  return { chunksIngested: documents.length };
};

module.exports = { ingest };

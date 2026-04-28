'use strict';

/**
 * Vector store adapter.
 *
 * In-memory implementation suitable for development and testing.
 * Replace upsert/query with calls to pgvector, Pinecone, Weaviate,
 * or any other provider without changing the retriever interface.
 *
 * Document schema:
 *   { id: string, text: string, embedding: number[], metadata: object }
 */

/** @type {Map<string, object>} */
const store = new Map();

/**
 * Upserts documents into the vector store.
 * @param {Array<{ id: string, text: string, embedding: number[], metadata: object }>} documents
 */
const upsert = async (documents) => {
  for (const doc of documents) {
    store.set(doc.id, doc);
  }
};

/**
 * Queries the store for the top-k most similar documents to the given query embedding.
 * Uses cosine similarity.
 *
 * @param {number[]} queryEmbedding
 * @param {number}   topK
 * @returns {Promise<Array<{ id: string, text: string, score: number, metadata: object }>>}
 */
const query = async (queryEmbedding, topK = 5) => {
  const results = [];

  for (const doc of store.values()) {
    const score = cosineSimilarity(queryEmbedding, doc.embedding);
    results.push({ id: doc.id, text: doc.text, score, metadata: doc.metadata });
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
};

/**
 * Removes a document from the store by id.
 * @param {string} id
 */
const remove = async (id) => {
  store.delete(id);
};

/**
 * Clears the entire store (useful in tests).
 */
const clear = async () => {
  store.clear();
};

// ── helpers ────────────────────────────────────────────────────────────────────

const cosineSimilarity = (a, b) => {
  if (a.length !== b.length) throw new Error('Embedding dimension mismatch');
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot   += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
};

module.exports = { upsert, query, remove, clear };

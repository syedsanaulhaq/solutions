'use strict';

/**
 * Splits a document's text into overlapping chunks suitable for embedding.
 *
 * Strategy: recursive character splitting on paragraph → sentence → word boundaries,
 * with a configurable chunk size and overlap.
 *
 * @param {string} text              - Raw document text.
 * @param {object} [options]
 * @param {number} [options.chunkSize=512]    - Target size in characters per chunk.
 * @param {number} [options.chunkOverlap=64]  - Number of characters to overlap between chunks.
 * @returns {string[]}
 */
const chunk = (text, { chunkSize = 512, chunkOverlap = 64 } = {}) => {
  if (!text || !text.trim()) return [];

  const chunks = [];
  let start = 0;

  while (start < text.length) {
    let end = start + chunkSize;

    if (end < text.length) {
      // Walk back to a natural boundary (newline > period > space)
      const window = text.slice(start, end);
      const nlIdx = window.lastIndexOf('\n');
      const dotIdx = window.lastIndexOf('. ');
      const spIdx = window.lastIndexOf(' ');

      const boundary = nlIdx > chunkSize * 0.5
        ? nlIdx
        : dotIdx > chunkSize * 0.5
          ? dotIdx + 1
          : spIdx > chunkSize * 0.5
            ? spIdx
            : chunkSize;

      end = start + boundary;
    }

    chunks.push(text.slice(start, end).trim());
    start = end - chunkOverlap;
  }

  return chunks.filter(Boolean);
};

module.exports = { chunk };

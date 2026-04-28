'use strict';

const fs = require('fs/promises');
const logger = require('../../../utils/logger');

/**
 * Loads raw text content from a supported source.
 *
 * Supported source types:
 *   - 'file'  — reads a file from the local filesystem
 *   - 'text'  — accepts inline text content directly
 *   - 'url'   — fetches content from an HTTP/S URL (stub; wire up fetch/axios as needed)
 *
 * @param {{ type: 'file'|'text'|'url', content: string }} source
 * @returns {Promise<{ text: string, metadata: object }>}
 */
const load = async (source) => {
  switch (source.type) {
    case 'file': {
      logger.info('Loading document from file', { path: source.content });
      const text = await fs.readFile(source.content, 'utf8');
      return { text, metadata: { source: source.content, type: 'file' } };
    }

    case 'text': {
      return { text: source.content, metadata: { source: 'inline', type: 'text' } };
    }

    case 'url': {
      logger.info('Loading document from URL', { url: source.content });
      // TODO: replace with production-grade fetch + HTML-to-text extraction
      const res = await fetch(source.content);
      if (!res.ok) throw new Error(`Failed to fetch ${source.content}: HTTP ${res.status}`);
      const text = await res.text();
      return { text, metadata: { source: source.content, type: 'url' } };
    }

    default:
      throw new Error(`Unsupported document source type: "${source.type}"`);
  }
};

module.exports = { load };

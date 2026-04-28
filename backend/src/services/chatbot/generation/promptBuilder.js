'use strict';

const MAX_CONTEXT_CHARS = 6000;

/**
 * Assembles the full prompt for the LLM from retrieved chunks and conversation history.
 *
 * @param {object} params
 * @param {string}   params.query    - The user's current message.
 * @param {object[]} params.chunks   - Retrieved context chunks ({ text, metadata }).
 * @param {object[]} params.history  - Trimmed conversation history ({ role, content }[]).
 * @returns {{ systemPrompt: string, messages: object[] }}
 */
const build = ({ query, chunks, history = [] }) => {
  const contextBlock = chunks
    .map((c, i) => `[${i + 1}] ${c.text}`)
    .join('\n\n')
    .slice(0, MAX_CONTEXT_CHARS);

  const systemPrompt = [
    'You are a knowledgeable HostingOcean support assistant.',
    'Answer the user\'s question using only the information in the context below.',
    'If the context does not contain enough information, say so honestly.',
    'Be concise and accurate. Cite the relevant context numbers when useful.',
    '',
    '## Context',
    contextBlock,
  ].join('\n');

  const messages = [
    ...history,
    { role: 'user', content: query },
  ];

  return { systemPrompt, messages };
};

module.exports = { build };

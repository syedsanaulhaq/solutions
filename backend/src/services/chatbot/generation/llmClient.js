'use strict';

const logger = require('../../../utils/logger');

const DEFAULT_MODEL       = 'gpt-4o-mini';
const DEFAULT_TEMPERATURE = 0.2;
const DEFAULT_MAX_TOKENS  = 1024;

/**
 * Thin wrapper around the OpenAI Chat Completions API.
 * Swap the base URL and auth header to target a different provider
 * (Azure OpenAI, Anthropic via OpenAI-compatible proxy, local Ollama, etc.).
 *
 * @param {object} params
 * @param {string}   params.systemPrompt
 * @param {object[]} params.messages       - Chat history + current user message.
 * @param {object}   [params.options]      - Per-request overrides.
 * @returns {Promise<{ content: string, usage: object }>}
 */
const complete = async ({ systemPrompt, messages, options = {} }) => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error('OPENAI_API_KEY is not set');

  const body = {
    model:       options.model       ?? process.env.CHAT_MODEL ?? DEFAULT_MODEL,
    temperature: options.temperature ?? DEFAULT_TEMPERATURE,
    max_tokens:  options.maxTokens   ?? DEFAULT_MAX_TOKENS,
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages,
    ],
  };

  logger.info('LLM request', { model: body.model, messageCount: body.messages.length });

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  return { content, usage: data.usage };
};

module.exports = { complete };

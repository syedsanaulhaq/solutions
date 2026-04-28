import { HostingOceanError } from './HostingOceanError.js';

const DEFAULT_BASE_URL = 'https://api.hostingocean.com/v1';
const DEFAULT_TIMEOUT_MS = 30_000;

/**
 * HostingOcean JavaScript SDK client.
 *
 * @example
 * const client = new HostingOceanClient({ apiKey: 'your-api-key' });
 * const health = await client.health.get();
 */
export class HostingOceanClient {
  #apiKey;
  #baseUrl;
  #timeoutMs;

  constructor({ apiKey, baseUrl = DEFAULT_BASE_URL, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
    if (!apiKey) throw new Error('HostingOceanClient: apiKey is required');
    this.#apiKey = apiKey;
    this.#baseUrl = baseUrl.replace(/\/$/, '');
    this.#timeoutMs = timeoutMs;

    this.health = {
      get: () => this.#request('GET', '/health'),
    };

    this.domains = {
      list:   ()           => this.#request('GET',    '/domains'),
      get:    (id)         => this.#request('GET',    `/domains/${id}`),
      create: (data)       => this.#request('POST',   '/domains', data),
      update: (id, data)   => this.#request('PATCH',  `/domains/${id}`, data),
      delete: (id)         => this.#request('DELETE', `/domains/${id}`),
    };

    this.hosting = {
      list:   ()           => this.#request('GET',    '/hosting'),
      get:    (id)         => this.#request('GET',    `/hosting/${id}`),
      create: (data)       => this.#request('POST',   '/hosting', data),
      delete: (id)         => this.#request('DELETE', `/hosting/${id}`),
    };
  }

  async #request(method, path, body) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.#timeoutMs);

    try {
      const res = await fetch(`${this.#baseUrl}${path}`, {
        method,
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${this.#apiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
      });

      const contentType = res.headers.get('Content-Type') ?? '';
      const data = contentType.includes('application/json')
        ? await res.json()
        : await res.text();

      if (!res.ok) {
        const message = data?.error?.message ?? data ?? `HTTP ${res.status}`;
        throw new HostingOceanError(message, res.status, data);
      }

      return data;
    } finally {
      clearTimeout(timer);
    }
  }
}

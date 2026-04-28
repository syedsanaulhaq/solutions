import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HostingOceanClient } from '../src/HostingOceanClient.js';
import { HostingOceanError } from '../src/HostingOceanError.js';

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

const json = (data, status = 200) =>
  Promise.resolve({
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => 'application/json' },
    json: () => Promise.resolve(data),
  });

describe('HostingOceanClient', () => {
  let client;

  beforeEach(() => {
    mockFetch.mockReset();
    client = new HostingOceanClient({ apiKey: 'test-key', baseUrl: 'https://api.test' });
  });

  it('throws if apiKey is missing', () => {
    expect(() => new HostingOceanClient()).toThrow('apiKey is required');
  });

  it('health.get sends GET /health', async () => {
    mockFetch.mockResolvedValue(json({ status: 'ok' }));
    const res = await client.health.get();
    expect(res.status).toBe('ok');
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test/health',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('domains.list sends GET /domains', async () => {
    mockFetch.mockResolvedValue(json([]));
    await client.domains.list();
    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.test/domains',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('domains.create sends POST /domains with body', async () => {
    const payload = { name: 'example.com' };
    mockFetch.mockResolvedValue(json({ id: '1', ...payload }));
    await client.domains.create(payload);
    const [, opts] = mockFetch.mock.calls[0];
    expect(opts.method).toBe('POST');
    expect(JSON.parse(opts.body)).toEqual(payload);
  });

  it('throws HostingOceanError on non-2xx response', async () => {
    mockFetch.mockResolvedValue(json({ error: { message: 'Not found' } }, 404));
    await expect(client.domains.get('missing')).rejects.toBeInstanceOf(HostingOceanError);
  });

  it('sets Authorization header', async () => {
    mockFetch.mockResolvedValue(json({}));
    await client.health.get();
    const [, opts] = mockFetch.mock.calls[0];
    expect(opts.headers['Authorization']).toBe('Bearer test-key');
  });
});

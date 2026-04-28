const BASE_URL = import.meta.env.VITE_API_URL ?? '/api';

/**
 * Thin fetch wrapper for the HostingOcean backend API.
 * All requests are sent with JSON content type.
 * Non-2xx responses are thrown as Errors with the response body message.
 */
const request = async (method, path, body) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };

  if (body !== undefined) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${BASE_URL}${path}`, options);

  const contentType = response.headers.get('Content-Type') ?? '';
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    const message =
      (data && data.error && data.error.message) ||
      (typeof data === 'string' ? data : 'Request failed');
    const err = new Error(message);
    err.status = response.status;
    throw err;
  }

  return data;
};

export const api = {
  get:    (path)        => request('GET',    path),
  post:   (path, body)  => request('POST',   path, body),
  put:    (path, body)  => request('PUT',    path, body),
  patch:  (path, body)  => request('PATCH',  path, body),
  delete: (path)        => request('DELETE', path),
};

export default api;

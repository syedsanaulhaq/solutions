export class HostingOceanError extends Error {
  constructor(message, statusCode, body) {
    super(message);
    this.name = 'HostingOceanError';
    this.statusCode = statusCode;
    this.body = body;
  }
}

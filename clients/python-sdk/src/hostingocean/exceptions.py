class HostingOceanError(Exception):
    """Raised when the HostingOcean API returns a non-2xx response."""

    def __init__(self, message: str, status_code: int, body: dict | None = None) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.body = body

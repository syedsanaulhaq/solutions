from __future__ import annotations

from typing import Any

import httpx

from .exceptions import HostingOceanError

DEFAULT_BASE_URL = "https://api.hostingocean.com/v1"
DEFAULT_TIMEOUT = 30.0


class HostingOceanClient:
    """Official HostingOcean Python SDK client.

    Example::

        client = HostingOceanClient(api_key="your-api-key")
        health = client.health.get()
    """

    def __init__(
        self,
        api_key: str,
        base_url: str = DEFAULT_BASE_URL,
        timeout: float = DEFAULT_TIMEOUT,
    ) -> None:
        if not api_key:
            raise ValueError("api_key is required")

        self._client = httpx.Client(
            base_url=base_url.rstrip("/"),
            timeout=timeout,
            headers={
                "Authorization": f"Bearer {api_key}",
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        )

        self.health = _HealthResource(self)
        self.domains = _DomainsResource(self)
        self.hosting = _HostingResource(self)

    def _request(self, method: str, path: str, json: Any = None) -> Any:
        response = self._client.request(method, path, json=json)
        if not response.is_success:
            body = response.json() if response.content else None
            message = (body or {}).get("error", {}).get("message", f"HTTP {response.status_code}")
            raise HostingOceanError(message, response.status_code, body)
        return response.json() if response.content else None

    def close(self) -> None:
        self._client.close()

    def __enter__(self) -> "HostingOceanClient":
        return self

    def __exit__(self, *_: Any) -> None:
        self.close()


class _HealthResource:
    def __init__(self, client: HostingOceanClient) -> None:
        self._c = client

    def get(self) -> dict:
        return self._c._request("GET", "/health")


class _DomainsResource:
    def __init__(self, client: HostingOceanClient) -> None:
        self._c = client

    def list(self) -> list:
        return self._c._request("GET", "/domains")

    def get(self, domain_id: str) -> dict:
        return self._c._request("GET", f"/domains/{domain_id}")

    def create(self, data: dict) -> dict:
        return self._c._request("POST", "/domains", json=data)

    def update(self, domain_id: str, data: dict) -> dict:
        return self._c._request("PATCH", f"/domains/{domain_id}", json=data)

    def delete(self, domain_id: str) -> None:
        return self._c._request("DELETE", f"/domains/{domain_id}")


class _HostingResource:
    def __init__(self, client: HostingOceanClient) -> None:
        self._c = client

    def list(self) -> list:
        return self._c._request("GET", "/hosting")

    def get(self, hosting_id: str) -> dict:
        return self._c._request("GET", f"/hosting/{hosting_id}")

    def create(self, data: dict) -> dict:
        return self._c._request("POST", "/hosting", json=data)

    def delete(self, hosting_id: str) -> None:
        return self._c._request("DELETE", f"/hosting/{hosting_id}")

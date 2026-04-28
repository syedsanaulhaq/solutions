import pytest
import respx
import httpx

from hostingocean import HostingOceanClient, HostingOceanError

BASE = "https://api.test/v1"


@pytest.fixture
def client():
    return HostingOceanClient(api_key="test-key", base_url=BASE)


def test_requires_api_key():
    with pytest.raises(ValueError, match="api_key is required"):
        HostingOceanClient(api_key="")


@respx.mock
def test_health_get(client):
    respx.get(f"{BASE}/health").mock(return_value=httpx.Response(200, json={"status": "ok"}))
    result = client.health.get()
    assert result["status"] == "ok"


@respx.mock
def test_domains_list(client):
    respx.get(f"{BASE}/domains").mock(return_value=httpx.Response(200, json=[]))
    result = client.domains.list()
    assert isinstance(result, list)


@respx.mock
def test_domains_create(client):
    payload = {"name": "example.com"}
    respx.post(f"{BASE}/domains").mock(
        return_value=httpx.Response(201, json={"id": "1", **payload})
    )
    result = client.domains.create(payload)
    assert result["name"] == "example.com"


@respx.mock
def test_raises_hosting_ocean_error_on_404(client):
    respx.get(f"{BASE}/domains/missing").mock(
        return_value=httpx.Response(404, json={"error": {"message": "Not found"}})
    )
    with pytest.raises(HostingOceanError) as exc_info:
        client.domains.get("missing")
    assert exc_info.value.status_code == 404


@respx.mock
def test_authorization_header(client):
    route = respx.get(f"{BASE}/health").mock(
        return_value=httpx.Response(200, json={"status": "ok"})
    )
    client.health.get()
    assert route.calls[0].request.headers["Authorization"] == "Bearer test-key"


def test_context_manager():
    with HostingOceanClient(api_key="test-key", base_url=BASE) as c:
        assert c is not None

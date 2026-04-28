<?php

declare(strict_types=1);

namespace HostingOcean\Resources;

use HostingOcean\HostingOceanClient;

class DomainsResource
{
    public function __construct(private readonly HostingOceanClient $client) {}

    public function list(): array
    {
        return $this->client->request('GET', '/domains');
    }

    public function get(string $id): array
    {
        return $this->client->request('GET', "/domains/{$id}");
    }

    public function create(array $data): array
    {
        return $this->client->request('POST', '/domains', $data);
    }

    public function update(string $id, array $data): array
    {
        return $this->client->request('PATCH', "/domains/{$id}", $data);
    }

    public function delete(string $id): void
    {
        $this->client->request('DELETE', "/domains/{$id}");
    }
}

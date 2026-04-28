<?php

declare(strict_types=1);

namespace HostingOcean\Resources;

use HostingOcean\HostingOceanClient;

class HostingResource
{
    public function __construct(private readonly HostingOceanClient $client) {}

    public function list(): array
    {
        return $this->client->request('GET', '/hosting');
    }

    public function get(string $id): array
    {
        return $this->client->request('GET', "/hosting/{$id}");
    }

    public function create(array $data): array
    {
        return $this->client->request('POST', '/hosting', $data);
    }

    public function delete(string $id): void
    {
        $this->client->request('DELETE', "/hosting/{$id}");
    }
}

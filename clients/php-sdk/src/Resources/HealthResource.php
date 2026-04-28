<?php

declare(strict_types=1);

namespace HostingOcean\Resources;

use HostingOcean\HostingOceanClient;

class HealthResource
{
    public function __construct(private readonly HostingOceanClient $client) {}

    public function get(): array
    {
        return $this->client->request('GET', '/health');
    }
}

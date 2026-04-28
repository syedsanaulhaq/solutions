<?php

declare(strict_types=1);

namespace HostingOcean;

use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Exception\BadResponseException;

/**
 * Official HostingOcean PHP SDK client.
 *
 * @example
 * $client = new HostingOceanClient('your-api-key');
 * $health = $client->health()->get();
 */
class HostingOceanClient
{
    private HttpClient $http;

    public function __construct(
        string $apiKey,
        string $baseUrl = 'https://api.hostingocean.com/v1',
        float $timeout = 30.0
    ) {
        if ($apiKey === '') {
            throw new \InvalidArgumentException('apiKey is required');
        }

        $this->http = new HttpClient([
            'base_uri' => rtrim($baseUrl, '/') . '/',
            'timeout'  => $timeout,
            'headers'  => [
                'Authorization' => "Bearer {$apiKey}",
                'Accept'        => 'application/json',
                'Content-Type'  => 'application/json',
            ],
        ]);
    }

    public function health(): Resources\HealthResource
    {
        return new Resources\HealthResource($this);
    }

    public function domains(): Resources\DomainsResource
    {
        return new Resources\DomainsResource($this);
    }

    public function hosting(): Resources\HostingResource
    {
        return new Resources\HostingResource($this);
    }

    /**
     * @throws HostingOceanException
     */
    public function request(string $method, string $path, array $json = []): mixed
    {
        try {
            $options = $json !== [] ? ['json' => $json] : [];
            $response = $this->http->request($method, ltrim($path, '/'), $options);
            $body = (string) $response->getBody();
            return $body !== '' ? json_decode($body, true, 512, JSON_THROW_ON_ERROR) : null;
        } catch (BadResponseException $e) {
            $response = $e->getResponse();
            $body = json_decode((string) $response->getBody(), true);
            $message = $body['error']['message'] ?? ('HTTP ' . $response->getStatusCode());
            throw new HostingOceanException($message, $response->getStatusCode(), $body, $e);
        }
    }
}

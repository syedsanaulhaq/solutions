<?php

declare(strict_types=1);

namespace HostingOcean\Tests;

use GuzzleHttp\Client as HttpClient;
use GuzzleHttp\Handler\MockHandler;
use GuzzleHttp\HandlerStack;
use GuzzleHttp\Psr7\Response;
use GuzzleHttp\Exception\RequestException;
use GuzzleHttp\Psr7\Request;
use HostingOcean\HostingOceanClient;
use HostingOcean\HostingOceanException;
use PHPUnit\Framework\TestCase;

class HostingOceanClientTest extends TestCase
{
    private function makeClient(array $responses): HostingOceanClient
    {
        $mock    = new MockHandler($responses);
        $handler = HandlerStack::create($mock);
        $http    = new HttpClient(['handler' => $handler]);

        $client = new HostingOceanClient('test-key', 'https://api.test/v1');

        // Inject mock HTTP client via reflection
        $ref = new \ReflectionProperty(HostingOceanClient::class, 'http');
        $ref->setAccessible(true);
        $ref->setValue($client, $http);

        return $client;
    }

    private function jsonResponse(mixed $data, int $status = 200): Response
    {
        return new Response($status, ['Content-Type' => 'application/json'], json_encode($data));
    }

    public function test_throws_if_api_key_empty(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        new HostingOceanClient('');
    }

    public function test_health_get(): void
    {
        $client = $this->makeClient([$this->jsonResponse(['status' => 'ok'])]);
        $result = $client->health()->get();
        $this->assertSame('ok', $result['status']);
    }

    public function test_domains_list(): void
    {
        $client = $this->makeClient([$this->jsonResponse([])]);
        $result = $client->domains()->list();
        $this->assertIsArray($result);
    }

    public function test_domains_create(): void
    {
        $payload = ['name' => 'example.com'];
        $client  = $this->makeClient([$this->jsonResponse(['id' => '1'] + $payload, 201)]);
        $result  = $client->domains()->create($payload);
        $this->assertSame('example.com', $result['name']);
    }

    public function test_throws_hosting_ocean_exception_on_404(): void
    {
        $client = $this->makeClient([
            $this->jsonResponse(['error' => ['message' => 'Not found']], 404),
        ]);
        $this->expectException(HostingOceanException::class);
        $this->expectExceptionCode(404);
        $client->domains()->get('missing');
    }

    public function test_exception_carries_status_code(): void
    {
        $client = $this->makeClient([
            $this->jsonResponse(['error' => ['message' => 'Forbidden']], 403),
        ]);
        try {
            $client->domains()->get('any');
        } catch (HostingOceanException $e) {
            $this->assertSame(403, $e->getStatusCode());
        }
    }
}

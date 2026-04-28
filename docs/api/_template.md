# {Resource Name} API

> Base path: `/api/{resource}`
> Authentication: Bearer token (`Authorization: Bearer <token>`)
> Content-Type: `application/json`

---

## Endpoints

### List {Resources}

```
GET /api/{resource}
```

**Query Parameters**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `page` | integer | No | Page number (default: 1) |
| `limit` | integer | No | Items per page (default: 20, max: 100) |

**Response `200 OK`**

```json
{
  "data": [
    {
      "id": "string",
      "createdAt": "ISO-8601",
      "updatedAt": "ISO-8601"
    }
  ],
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

---

### Get {Resource}

```
GET /api/{resource}/:id
```

**Path Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | string | Unique identifier |

**Response `200 OK`**

```json
{
  "id": "string",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

**Error Responses**

| Status | Code | Description |
|--------|------|-------------|
| `404` | `NOT_FOUND` | Resource does not exist |

---

### Create {Resource}

```
POST /api/{resource}
```

**Request Body**

```json
{
  "field": "value"
}
```

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `field` | string | Yes | Min 1, max 255 chars |

**Response `201 Created`**

```json
{
  "id": "string",
  "field": "value",
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

**Error Responses**

| Status | Code | Description |
|--------|------|-------------|
| `400` | `VALIDATION_ERROR` | Request body failed validation |
| `409` | `CONFLICT` | Resource already exists |

---

### Update {Resource}

```
PATCH /api/{resource}/:id
```

**Request Body** — All fields optional (partial update)

```json
{
  "field": "new-value"
}
```

**Response `200 OK`** — Returns updated resource.

---

### Delete {Resource}

```
DELETE /api/{resource}/:id
```

**Response `204 No Content`**

---

## Common Error Schema

```json
{
  "error": {
    "status": 400,
    "code": "VALIDATION_ERROR",
    "message": "Human-readable description",
    "details": []
  }
}
```

## Changelog

| Version | Date | Change |
|---------|------|--------|
| `1.0.0` | YYYY-MM-DD | Initial release |

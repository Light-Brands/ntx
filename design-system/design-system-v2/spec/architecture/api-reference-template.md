# API Reference

**API endpoint specification for {BRAND_NAME}**

## Base URL

```
Production: https://api.{brand}.com/v1
Staging: https://api.staging.{brand}.com/v1
```

## Authentication

All endpoints require authentication unless marked as public.

```typescript
// Headers
{
  "Authorization": "Bearer {access_token}",
  "Content-Type": "application/json"
}
```

## Endpoints

### Users

#### GET /users/me
Get current user profile.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "display_name": "User Name",
  "avatar_url": "https://..."
}
```

#### PATCH /users/me
Update current user profile.

**Request:**
```json
{
  "display_name": "New Name",
  "avatar_url": "https://..."
}
```

### {Resource}

#### GET /{resource}
List all {resources}.

**Query Parameters:**
| Param | Type | Description |
|-------|------|-------------|
| page | number | Page number (default: 1) |
| limit | number | Items per page (default: 20) |
| sort | string | Sort field |

**Response:**
```json
{
  "data": [...],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

#### GET /{resource}/:id
Get single {resource}.

#### POST /{resource}
Create new {resource}.

#### PATCH /{resource}/:id
Update {resource}.

#### DELETE /{resource}/:id
Delete {resource}.

## Error Responses

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {}
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| UNAUTHORIZED | 401 | Invalid or missing token |
| FORBIDDEN | 403 | Insufficient permissions |
| NOT_FOUND | 404 | Resource not found |
| VALIDATION_ERROR | 422 | Invalid request data |

## Rate Limiting

- 100 requests per minute per user
- 1000 requests per minute per IP

---

*Template from Onyx Design System*

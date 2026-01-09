# Service Layer

**Business logic patterns for {BRAND_NAME}**

## Architecture Overview

```
API Routes → Services → Repositories → Database
                ↓
            External APIs
```

## Service Patterns

### Base Service

```typescript
// lib/services/base.service.ts
export abstract class BaseService<T> {
  protected supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  abstract getById(id: string): Promise<T | null>;
  abstract create(data: Partial<T>): Promise<T>;
  abstract update(id: string, data: Partial<T>): Promise<T>;
  abstract delete(id: string): Promise<void>;
}
```

### Example Service

```typescript
// lib/services/user.service.ts
export class UserService extends BaseService<User> {
  async getById(id: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new ServiceError('USER_NOT_FOUND', error);
    return data;
  }

  async updateProfile(id: string, profile: UpdateProfileDto): Promise<User> {
    // Validate input
    const validated = UpdateProfileSchema.parse(profile);

    // Business logic
    const { data, error } = await this.supabase
      .from('users')
      .update(validated)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new ServiceError('UPDATE_FAILED', error);

    // Side effects
    await this.notifyProfileUpdate(id);

    return data;
  }
}
```

## Error Handling

```typescript
// lib/errors/service.error.ts
export class ServiceError extends Error {
  constructor(
    public code: string,
    public originalError?: Error,
    public statusCode: number = 500
  ) {
    super(code);
  }
}

// Usage
throw new ServiceError('VALIDATION_FAILED', null, 422);
```

## External Integrations

### Pattern for External APIs

```typescript
// lib/integrations/external.ts
export class ExternalApiClient {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  async request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new ServiceError('EXTERNAL_API_ERROR');
    }

    return response.json();
  }
}
```

## Dependency Injection

```typescript
// lib/container.ts
export function createServices(supabase: SupabaseClient) {
  return {
    users: new UserService(supabase),
    // Add more services
  };
}

// Usage in API route
export async function GET(request: Request) {
  const supabase = createServerClient();
  const services = createServices(supabase);

  const user = await services.users.getById(id);
  return Response.json(user);
}
```

---

*Template from Onyx Design System*

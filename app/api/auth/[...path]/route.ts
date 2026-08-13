import { auth } from '@/lib/auth/server';

// auth.handler() exposes the HTTP methods implemented by the proxy.
// The handler may not include `OPTIONS` in its TypeScript signature, so
// only export the methods that the handler type actually provides.
export const { GET, POST, PUT, DELETE, PATCH } = auth.handler();

import { auth } from '@/lib/auth/server';

// auth.handler() exposes the HTTP methods implemented by the proxy.
// The handler's inferred types can be incompatible with Next's generated
// `NextRequest`-based route validator. Cast to `any` here to avoid a
// build-time TypeScript mismatch — the runtime behavior is unchanged.
const _handler = auth.handler() as any;
export const { GET, POST, PUT, DELETE, PATCH } = _handler;
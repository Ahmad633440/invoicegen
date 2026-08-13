import { auth } from '@/lib/auth/server';

export default auth.middleware({
  // Redirect unauthenticated users to the app sign-in page
  loginUrl: '/signin',
});

export const config = {
  matcher: [
    // Protected routes requiring authentication
    '/account/:path*',
  ],
};
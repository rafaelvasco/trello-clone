import { authMiddleware, redirectToSignIn } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ['/', '/api/webhook'],
  afterAuth(auth, req) {
    // User is authenticated but tried to go to landing page
    // if an orgId is selected go directly to /organization/:id
    // otherwise go to /select-org
    if (auth.userId && auth.isPublicRoute) {
      let path = '/select-org';

      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    // If user is not authenticated and tried to access a protected route
    // redirect to SignIn and then go back to the route the user tried to access before.
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: req.url,
      });
    }

    // If the user is trying to do anything without having an Organization selected
    // go to /select-org
    if (
      auth.userId &&
      !auth.orgId &&
      req.nextUrl.pathname !== '/select-org'
    ) {
      const orgSelection = new URL('/select-org', req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};

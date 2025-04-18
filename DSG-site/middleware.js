// Simple middleware example
export default function middleware(req) {
  // Keep middleware lightweight to avoid timeouts
  const url = req.nextUrl.clone();
  
  // Simple redirect example
  if (url.pathname === '/old-page') {
    url.pathname = '/new-page';
    return Response.redirect(url);
  }
  
  // Always return a response or next()
  return Response.next();
}

// Configure which paths this middleware will run on
export const config = {
  matcher: [
    // Skip static files
    '/((?!_next/static|_next/image|favicon.ico|images/).*)'
  ],
};
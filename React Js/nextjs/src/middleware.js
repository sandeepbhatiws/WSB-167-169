import { NextResponse } from 'next/server'
 
export function middleware(request) {
  // Middleware logic

  // Example: redirect if user is not logged in
  const isLoggedIn = request.cookies.get('userLogin')?.value;

  if ((isLoggedIn == 0) && request.nextUrl.pathname.startsWith('/my-profile')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if ((isLoggedIn == 1) && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

   // Handle simple requests
    const response = NextResponse.next()
    return response;
}
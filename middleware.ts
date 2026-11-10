import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const auth = request.cookies.get('pf-auth')?.value

  if (auth !== 'ok') {
    const from = request.nextUrl.pathname
    const url = new URL('/enter', request.url)
    url.searchParams.set('from', from)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  // Only Google Boba is password-protected; Exact and IMC Prosperity are public.
  // Covers the legacy /v2 and archived copies so Boba isn't exposed through them.
  matcher: [
    '/work/google-boba/:path*',
    '/v2/work/google-boba/:path*',
    '/archive/work/google-boba/:path*',
  ],
}

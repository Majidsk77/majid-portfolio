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
  // Protect both the production case studies and the V2 case study routes so an
  // unlock started from /v2/work/* returns to the V2 page (via `from`).
  matcher: ['/work/:path*', '/v2/work/:path*'],
}

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
  matcher: ['/work/:path*'],
}

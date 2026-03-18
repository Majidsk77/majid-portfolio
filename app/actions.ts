'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function checkPassword(
  _prevState: { error: boolean } | null,
  formData: FormData
): Promise<{ error: boolean }> {
  const password = formData.get('password') as string
  const from = (formData.get('from') as string) || '/'

  if (password === 'Majid2026//') {
    const store = await cookies()
    store.set('pf-auth', 'ok', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    })
    redirect(from)
  }

  return { error: true }
}

'use client'

import { useActionState } from 'react'
import { checkPassword } from '@/app/actions'

export default function PasswordForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState(checkPassword, null)

  return (
    <form action={action} className="flex flex-col gap-8">
      <input type="hidden" name="from" value={from} />

      <div className="flex flex-col gap-2">
        <input
          type="password"
          name="password"
          placeholder="Password"
          autoComplete="current-password"
          required
          className="w-full bg-transparent border-b border-[var(--border)] pb-3 text-[16px] font-light text-[var(--text)] placeholder:text-[var(--faint)] outline-none focus:border-[var(--text)] transition-colors duration-200"
          style={{ borderRadius: 0 }}
        />
        {state?.error && (
          <p className="text-[12px] text-[var(--muted)] tracking-[0.02em]">
            Incorrect password. Please try again.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="self-start flex items-center gap-3 font-serif italic text-[20px] tracking-[-0.01em] text-[var(--text)] hover:text-[var(--muted)] transition-colors duration-200 group"
      >
        {pending ? 'Entering…' : 'Enter'}
        {!pending && (
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        )}
      </button>
    </form>
  )
}

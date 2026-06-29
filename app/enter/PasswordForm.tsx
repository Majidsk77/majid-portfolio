'use client'

import { useActionState } from 'react'
import { checkPassword } from '@/app/actions'

export default function PasswordForm({ from }: { from: string }) {
  const [state, action, pending] = useActionState(checkPassword, null)

  return (
    <form
      action={action}
      aria-busy={pending}
      style={{
        width: '100%',
        maxWidth: '360px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        opacity: pending ? 0.7 : 1,
        transition: 'opacity 0.25s ease',
      }}
    >
      <input type="hidden" name="from" value={from} />

      {/* Visually-hidden label keeps it screen-reader friendly */}
      <label
        htmlFor="enter-password"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Password
      </label>

      <input
        id="enter-password"
        className="enter-input"
        type="password"
        name="password"
        placeholder="Password"
        autoComplete="current-password"
        required
        autoFocus
        aria-describedby={state?.error ? 'enter-error' : undefined}
      />

      {state?.error && (
        <p id="enter-error" className="enter-error" role="status" aria-live="polite">
          That key doesn&apos;t fit. Try again.
        </p>
      )}

      <button type="submit" className="enter-btn" disabled={pending}>
        {pending ? 'Unlocking…' : 'Unlock'}
        {!pending && <span className="enter-btn-arrow" aria-hidden="true">→</span>}
      </button>

      <style>{`
        .enter-input {
          width: 100%;
          box-sizing: border-box;
          background: #fffefb;
          border: 1.5px solid rgba(217, 217, 217, 0.9);
          border-radius: 14px;
          padding: 14px 16px;
          font-family: inherit;
          font-size: 16px;
          color: #111110;
          outline: none;
          -webkit-appearance: none;
          appearance: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .enter-input::placeholder { color: #a8a8a3; }
        .enter-input:focus {
          border-color: rgba(121, 175, 182, 0.9);
          box-shadow: 0 0 0 4px rgba(121, 175, 182, 0.16);
        }

        .enter-error {
          margin: -2px 0 2px;
          font-size: 13px;
          line-height: 1.4;
          color: #9a7a5e;
        }

        /* Tactile, pressable primary CTA */
        .enter-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 14px 24px;
          border: none;
          border-radius: 30px;
          font-family: inherit;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.01em;
          color: #f7f5f0;
          background: #111110;
          cursor: pointer;
          box-shadow: 0 4px 0 rgba(17,17,16,0.32), 0 8px 16px rgba(17,17,16,0.16);
          transform: translateY(0);
          transition: transform 0.14s ease, box-shadow 0.14s ease;
        }
        .enter-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 0 rgba(17,17,16,0.32), 0 12px 20px rgba(17,17,16,0.2);
        }
        .enter-btn:active {
          transform: translateY(3px);
          box-shadow: 0 1px 0 rgba(17,17,16,0.32), 0 3px 8px rgba(17,17,16,0.18);
        }
        .enter-btn:focus-visible {
          outline: 2px solid rgba(121, 175, 182, 0.9);
          outline-offset: 3px;
        }
        .enter-btn:disabled { cursor: default; }
        .enter-btn-arrow { display: inline-block; transition: transform 0.2s ease; }
        .enter-btn:hover .enter-btn-arrow { transform: translateX(3px); }

        @media (prefers-reduced-motion: reduce) {
          .enter-btn, .enter-btn-arrow, .enter-input { transition: none; }
          .enter-btn:hover, .enter-btn:active { transform: none; }
          .enter-btn:hover .enter-btn-arrow { transform: none; }
        }
      `}</style>
    </form>
  )
}

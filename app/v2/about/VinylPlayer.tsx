'use client'

// Vinyl player — hover/focus reveals a small "Now Playing" music card.
// Sits where the decorative vinyl table used to (ART), now interactive.
// Easy to edit: change NOW_PLAYING below.

import { useState } from 'react'

const NOW_PLAYING = {
  title: 'Song Title',
  artist: 'Artist Name',
  note: 'currently on repeat',
  url: 'https://open.spotify.com/',
}

export default function VinylPlayer() {
  const [active, setActive] = useState(false)

  return (
    <div
      className="ab-vinyl"
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* Focusable trigger over the artwork — reveals the card on hover/focus.
          No lift/rise: the player stays grounded in the room. */}
      <button
        type="button"
        className="av-trigger"
        aria-label={`Vinyl player. Now playing: ${NOW_PLAYING.title} by ${NOW_PLAYING.artist}, ${NOW_PLAYING.note}.`}
        aria-expanded={active}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
      >
        <img
          src="/images/about/pixel-art-vinyl-table.png"
          alt=""
          aria-hidden="true"
          className="av-art"
          style={{ aspectRatio: '1536 / 1024' }}
        />
      </button>

      {/* Now Playing card — music tooltip, anchored above the player */}
      <div
        className={`av-card${active ? ' is-open' : ''}`}
        role="status"
        aria-hidden={!active}
      >
        <span className="av-eyebrow">
          <span className="av-eq" aria-hidden="true"><i /><i /><i /></span>
          Now playing
        </span>
        <span className="av-title">{NOW_PLAYING.title}</span>
        <span className="av-artist">{NOW_PLAYING.artist}</span>
        <span className="av-note">{NOW_PLAYING.note}</span>
        {NOW_PLAYING.url && (
          <a
            className="av-link"
            href={NOW_PLAYING.url}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={active ? 0 : -1}
          >
            Open Spotify ↗
          </a>
        )}
      </div>

      <style>{`
        /* Positioned where the vinyl ART used to sit (left 1.8%, top 40.8%) */
        .ab-vinyl {
          position: absolute;
          left: 1.8%;
          top: 40.8%;
          width: 49%;
          z-index: 1;
        }
        .av-trigger {
          display: block;
          width: 100%;
          padding: 0; margin: 0;
          border: none; background: none;
          cursor: pointer; line-height: 0;
          outline: none;
        }
        .av-trigger:focus-visible {
          outline: 2px solid rgba(121,175,182,0.9);
          outline-offset: 6px;
          border-radius: 8px;
        }
        .av-art {
          width: 100%;
          height: auto;
          object-fit: contain;
          display: block;
          user-select: none;
        }
        /* ── Now Playing card ──────────────────────────────── */
        .av-card {
          position: absolute;
          left: 16%;
          bottom: 78%;            /* floats just above the player */
          width: clamp(150px, 15vw, 188px);
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: 12px 14px 13px;
          background: #fffdf8;
          border: 1.5px solid rgba(121, 175, 182, 0.45);
          border-radius: 14px;
          box-shadow: 0 6px 16px rgba(121, 175, 182, 0.14);
          color: #111110;
          z-index: 4;
          opacity: 0;
          transform: translateY(6px) scale(0.97);
          transform-origin: bottom left;
          pointer-events: none;
          transition: opacity 0.22s cubic-bezier(0.215,0.61,0.355,1),
                      transform 0.26s cubic-bezier(0.215,0.61,0.355,1);
        }
        .av-card.is-open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }
        @media (prefers-reduced-motion: reduce) {
          .av-card { transition: opacity 0.18s ease; transform: none; }
          .av-card.is-open { transform: none; }
        }

        .av-eyebrow {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 10px; font-weight: 500; letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #2f6a72;
          margin-bottom: 3px;
        }
        .av-title  { font-size: 14px; font-weight: 500; line-height: 1.25; }
        .av-artist { font-size: 12.5px; color: #4a4a47; line-height: 1.3; }
        .av-note   { font-size: 11px; font-style: italic; color: #8a8a85; margin-top: 2px; }
        .av-link {
          margin-top: 8px;
          font-size: 11.5px; font-weight: 500;
          color: #2f6a72; text-decoration: none;
          border-bottom: 1px solid rgba(47,106,114,0.3);
          align-self: flex-start;
          transition: border-color 0.2s ease;
        }
        .av-link:hover { border-color: rgba(47,106,114,0.9); }

        /* Tiny equalizer bars in the eyebrow */
        .av-eq { display: inline-flex; align-items: flex-end; gap: 2px; height: 9px; }
        .av-eq i {
          width: 2px; height: 100%;
          background: #2f6a72; border-radius: 1px;
          transform-origin: bottom;
        }
        @media (prefers-reduced-motion: no-preference) {
          .av-card.is-open .av-eq i { animation: avEq 0.9s ease-in-out infinite; }
          .av-card.is-open .av-eq i:nth-child(2) { animation-delay: 0.3s; }
          .av-card.is-open .av-eq i:nth-child(3) { animation-delay: 0.15s; }
        }
        @keyframes avEq {
          0%, 100% { transform: scaleY(0.4); }
          50%      { transform: scaleY(1); }
        }

        /* Mobile — drop the absolute stage, stack inline (matches room rules) */
        @media (max-width: 760px) {
          .ab-vinyl {
            position: static !important;
            left: auto !important; top: auto !important;
            width: 260px !important;
            display: flex; flex-direction: column; align-items: center;
          }
          .av-card {
            position: static !important;
            left: auto; bottom: auto;
            width: 100% !important;
            max-width: 260px;
            margin-top: 10px;
            opacity: 1;
            transform: none;
            pointer-events: auto;
          }
          .av-art.is-spinning { animation: none; }
        }
      `}</style>
    </div>
  )
}

'use client'

/* ── Shared case study overview + metrics components ──
   Used by all three case study pages.
   StatRow     — headline metrics strip
   OverviewGrid — editorial project metadata block
─────────────────────────────────────────────────────── */

export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[]
}) {
  return (
    <div className="flex flex-wrap gap-x-10 gap-y-7 my-12">
      {stats.map((stat) => (
        <div key={stat.label}>
          <div className="cs-stat-value">{stat.value}</div>
          <div className="cs-stat-label">{stat.label}</div>
        </div>
      ))}
    </div>
  )
}

export function OverviewGrid({
  rows,
  outcomes,
}: {
  rows: { label: string; value: string }[]
  outcomes: string[]
}) {
  const labelStyle: React.CSSProperties = {
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.09em',
    color: 'var(--faint)',
    paddingTop: '2px',
    flexShrink: 0,
    lineHeight: 1.4,
  }

  const valueStyle: React.CSSProperties = {
    fontSize: '13px',
    color: 'var(--muted)',
    fontWeight: 300,
    lineHeight: 1.7,
  }

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '90px 1fr',
    gap: '14px',
  }

  return (
    <div
      className="my-12"
      style={{
        borderTop: '1px solid var(--border)',
        paddingTop: '24px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {rows.map((row) => (
          <div key={row.label} style={rowStyle}>
            <span style={labelStyle}>{row.label}</span>
            <span style={valueStyle}>{row.value}</span>
          </div>
        ))}

        {/* Outcome row */}
        <div style={rowStyle}>
          <span style={labelStyle}>Outcome</span>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            {outcomes.map((o) => (
              <li
                key={o}
                style={{
                  ...valueStyle,
                  display: 'flex',
                  gap: '8px',
                }}
              >
                <span
                  style={{
                    color: 'var(--faint)',
                    userSelect: 'none',
                    flexShrink: 0,
                  }}
                >
                  —
                </span>
                <span>{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

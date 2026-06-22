// FooterV2 — /v2-specific footer matching Figma homepage design (node 1:17).
// Spec: px-40 py-24, two pills (Copyright left, Made in Amsterdam right).
// No border-top. Same pill treatment as NavV2. Do NOT use in other routes.

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '10px 16px',
        borderRadius: '30px',
        border: '1px solid rgba(217, 217, 217, 0.7)',
        fontSize: '16px',
        fontWeight: 400,
        color: '#111110',
        lineHeight: 'normal',
        whiteSpace: 'nowrap',
        fontFamily: 'inherit',
      }}
    >
      {children}
    </span>
  )
}

export default function FooterV2() {
  return (
    <footer
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '24px',
        paddingBottom: '24px',
        paddingLeft: 'clamp(20px, 2.78vw, 40px)',
        paddingRight: 'clamp(20px, 2.78vw, 40px)',
        flexShrink: 0,
      }}
    >
      <Pill>Copyright © 2026</Pill>
      <Pill>Made in Amsterdam</Pill>
    </footer>
  )
}

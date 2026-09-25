import { ImageResponse } from 'next/og'

/**
 * Generated Open Graph card: `/api/og?title=...&label=...`.
 * Keeps every page shareable even before real key art exists.
 */
export function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const title = (searchParams.get('title') ?? 'Every world is a system.').slice(
    0,
    120
  )
  const label = (searchParams.get('label') ?? 'systempunk.space').slice(0, 60)

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        background: '#07080a',
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '48px 48px',
        color: '#ebe9e4',
        fontFamily: 'sans-serif'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div
          style={{
            width: 30,
            height: 30,
            border: '2px solid #ebe9e4',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ width: 14, height: 14, background: '#ff6b2c' }} />
        </div>
        <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: 6 }}>
          SYSTEMPUNK
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div
          style={{
            fontSize: 22,
            letterSpacing: 5,
            color: '#ff6b2c',
            textTransform: 'uppercase'
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: title.length > 40 ? 72 : 96,
            fontWeight: 800,
            lineHeight: 0.95,
            textTransform: 'uppercase',
            letterSpacing: -2,
            maxWidth: 1000
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 20,
          letterSpacing: 4,
          color: '#a3a8af',
          textTransform: 'uppercase'
        }}
      >
        <span>Every world is a system.</span>
        <span>systempunk.space</span>
      </div>
    </div>,
    { width: 1200, height: 630 }
  )
}

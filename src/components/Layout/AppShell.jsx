import BottomNav from './BottomNav'

export default function AppShell({ screen, setScreen, savedCount, children }) {
  return (
    <div style={{
      fontFamily: 'var(--font)',
      background: 'var(--bg)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      color: 'var(--text-1)',
    }}>
      {/* Top nav bar */}
      <header
        role="banner"
        style={{
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          padding: '0 16px',
          height: 54,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{
            width: 30, height: 30,
            background: 'linear-gradient(135deg, #22c55e, #16a34a)',
            borderRadius: 9,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(22,163,74,0.3)',
          }}>
            <svg viewBox="0 0 16 16" style={{ width: 16, height: 16, fill: 'white' }}>
              <path d="M8 0a2.5 2.5 0 100 5 2.5 2.5 0 000-5zM5 7.5A1.5 1.5 0 016.5 6h3A1.5 1.5 0 0111 7.5V11l1.5 3H12l-1.2-2.5H9v2.5H7v-2.5H5.2L4 14H2.5L4 11V7.5z" />
            </svg>
          </div>
          <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.3px' }}>
            Access<span style={{ color: 'var(--green)' }}>Map</span>
          </span>
        </div>
      </header>

      {/* Screen content */}
      <main style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {children}
      </main>

      {/* Bottom nav — hide when writing review */}
      {screen !== 'review' && (
        <BottomNav
          currentScreen={screen}
          onScreenChange={setScreen}
          savedCount={savedCount}
        />
      )}
    </div>
  )
}

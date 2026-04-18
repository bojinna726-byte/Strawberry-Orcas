export const POS_CRITERIA = [
  'Ramp', 'Automatic door sensor', 'Working elevator',
  'Wide doorway/walkway', 'Good bathroom accessibility',
  'Curb cuts', 'Tactile paving', 'Accessible signage',
]

export const NEG_CRITERIA = [
  'Stairs', 'Steep incline', 'Broken/malfunctioning elevator',
  'Thin pathway', 'Uneven sidewalks', 'Poor bathroom accessibility',
]

export default function CriteriaButtons({ selectedPos, selectedNeg, onTogglePos, onToggleNeg }) {
  return (
    <div>
      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--green-dark)', marginBottom: 7, letterSpacing: '0.04em' }}>
        ✓ POSITIVE FEATURES
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
        {POS_CRITERIA.map((c) => {
          const on = selectedPos.has(c)
          return (
            <button
              key={c}
              type="button"
              onClick={() => onTogglePos(c)}
              aria-pressed={on}
              style={{
                background: on ? 'var(--green-light)' : 'var(--surface)',
                border: `1.5px solid ${on ? '#86efac' : 'var(--border-2)'}`,
                borderRadius: 'var(--r-full)',
                padding: '6px 11px',
                fontSize: 12, fontWeight: 500,
                color: on ? 'var(--green-dark)' : 'var(--text-2)',
                cursor: 'pointer',
                transition: 'all var(--t)',
                fontFamily: 'var(--font)',
              }}
            >
              + {c}
            </button>
          )
        })}
      </div>

      <p style={{ fontSize: 11, fontWeight: 700, color: 'var(--red)', marginBottom: 7, letterSpacing: '0.04em' }}>
        ✗ BARRIERS
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {NEG_CRITERIA.map((c) => {
          const on = selectedNeg.has(c)
          return (
            <button
              key={c}
              type="button"
              onClick={() => onToggleNeg(c)}
              aria-pressed={on}
              style={{
                background: on ? 'var(--red-light)' : 'var(--surface)',
                border: `1.5px solid ${on ? '#fca5a5' : 'var(--border-2)'}`,
                borderRadius: 'var(--r-full)',
                padding: '6px 11px',
                fontSize: 12, fontWeight: 500,
                color: on ? 'var(--red)' : 'var(--text-2)',
                cursor: 'pointer',
                transition: 'all var(--t)',
                fontFamily: 'var(--font)',
              }}
            >
              – {c}
            </button>
          )
        })}
      </div>
    </div>
  )
}

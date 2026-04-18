export default function StarRating({ value, onChange }) {
  return (
    <div
      role="group"
      aria-label="Rate out of 5 stars"
      style={{ display: 'flex', gap: 8 }}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
          aria-pressed={value >= n}
          style={{
            fontSize: 26,
            lineHeight: 1,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            filter: value >= n ? 'none' : 'grayscale(1)',
            opacity: value >= n ? 1 : 0.22,
            transition: 'opacity 0.12s ease, filter 0.12s ease, transform 0.12s ease',
            padding: 0,
          }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.12)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          ⭐
        </button>
      ))}
    </div>
  )
}

import { getScoreColor, getScoreLabel } from '../../utils/scoring';

export default function SavedPlaces({ places, savedIds, onUnsave, onPlaceClick }) {
  const savedPlaces = places.filter(place => savedIds.has(place.id));

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'var(--bg)' }}>

      {/* Header */}
      <div style={{
        background: 'var(--surface)',
        borderBottom: '1px solid var(--border)',
        padding: '14px 16px',
        flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)', letterSpacing: '-0.2px' }}>
          Saved Places
        </span>
        {savedPlaces.length > 0 && (
          <span style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500 }}>
            {savedPlaces.length} place{savedPlaces.length !== 1 ? 's' : ''}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {savedPlaces.length === 0 ? (
          <div style={{
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '60px 28px', textAlign: 'center', gap: 12,
          }}>
            <div style={{ fontSize: 44, opacity: 0.18 }}>🔖</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-1)' }}>
              No saved places yet
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-3)', lineHeight: 1.6, maxWidth: 240 }}>
              Tap the Save button on any place to bookmark it for quick access.
            </div>
          </div>
        ) : (
          <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>
            {savedPlaces.map((place) => (
              <div
                key={place.id}
                role="button"
                tabIndex={0}
                onClick={() => onPlaceClick(place.id)}
                onKeyDown={(e) => e.key === 'Enter' && onPlaceClick(place.id)}
                aria-label={`${place.name}, ${getScoreLabel(place.score)}`}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)',
                  padding: '13px 14px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  cursor: 'pointer',
                  transition: 'border-color var(--t), box-shadow var(--t)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--green)';
                  e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ fontSize: 24, lineHeight: 1 }}>{place.face}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-1)', marginBottom: 3 }}>
                    {place.name}
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', fontWeight: 500 }}>
                    {place.addr}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: getScoreColor(place.score), marginRight: 6 }}>
                  {place.score !== null ? place.score.toFixed(1) : '—'}
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); onUnsave(place.id); }}
                  aria-label={`Remove ${place.name} from saved`}
                  style={{
                    width: 26, height: 26,
                    borderRadius: 'var(--r-sm)',
                    background: 'var(--surface-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--text-3)',
                    fontSize: 12, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', transition: 'all var(--t)',
                    fontFamily: 'var(--font)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--red-light)';
                    e.currentTarget.style.color = 'var(--red)';
                    e.currentTarget.style.borderColor = '#fca5a5';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--surface-2)';
                    e.currentTarget.style.color = 'var(--text-3)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

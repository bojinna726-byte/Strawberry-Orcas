import { getScoreColor, getScoreBg, getBorderColor } from '../../utils/scoring';
import Badge from '../UI/Badge';

export default function PlaceHeader({ place, isSaved, onSave, onBack }) {

  return (
    <div style={{
      padding: '14px 16px',
      borderBottom: '1px solid var(--border)',
      display: 'flex', gap: 12, alignItems: 'flex-start',
      background: 'var(--surface)', flexShrink: 0,
    }}>

      {/* Back button */}
      <button
        onClick={onBack}
        aria-label="Back"
        style={{
          width: 32, height: 32,
          background: 'var(--surface-2)',
          borderRadius: 'var(--r-sm)',
          border: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, color: 'var(--text-2)', lineHeight: 1,
          flexShrink: 0, marginTop: 2, cursor: 'pointer',
          transition: 'background var(--t)',
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-3)'}
        onMouseLeave={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
      >
        ‹
      </button>

      {/* Place info */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-1)', marginBottom: 3, letterSpacing: '-0.3px' }}>
          {place.name}
        </div>
        <div style={{ fontSize: 12, color: 'var(--text-3)', fontWeight: 500, marginBottom: 6 }}>
          {place.addr}
        </div>
        <Badge score={place.score} face={place.face} />
      </div>

      {/* Score card + save button */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 7 }}>
        <div style={{
          width: 50, height: 50,
          borderRadius: 'var(--r-md)',
          background: getScoreBg(place.score),
          border: `1px solid ${getBorderColor(place.score)}`,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, lineHeight: 1, color: getScoreColor(place.score) }}>
            {place.score !== null ? place.score.toFixed(1) : '—'}
          </div>
          <div style={{ fontSize: 10, marginTop: 1, color: getScoreColor(place.score) }}>
            {place.face}
          </div>
        </div>

        <button
          onClick={onSave}
          aria-label={isSaved ? 'Remove from saved places' : 'Save this place'}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '5px 11px', borderRadius: 'var(--r-full)',
            fontSize: 11, fontWeight: 600,
            border: `1.5px solid ${isSaved ? '#86efac' : 'var(--border-2)'}`,
            background: isSaved ? 'var(--green-light)' : 'var(--surface-2)',
            color: isSaved ? 'var(--green-dark)' : 'var(--text-2)',
            cursor: 'pointer', whiteSpace: 'nowrap',
            transition: 'all var(--t)',
          }}
        >
          🔖 {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>
    </div>
  );
}

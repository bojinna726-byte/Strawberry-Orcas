import { getScoreColor, getScoreGradient } from '../../utils/scoring';

export default function ScoreBreakdown({ place }) {
  const pct = place.score !== null ? Math.round((place.score / 5) * 100) : 0;

  return (
    <div style={{
      background: 'var(--surface-2)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-md)',
      padding: '13px 14px',
    }}>
      <Row label="Positive features" value={place.posFeatures.length ? place.posFeatures.length + ' found' : 'None'} color="var(--green)" />
      <Row label="Barriers reported" value={place.negFeatures.length ? place.negFeatures.length + ' found' : 'None'} color="var(--red)" />
      {place.wheelchairAccessible !== undefined && (
        <Row
          label="Wheelchair accessible"
          value={place.wheelchairAccessible === true ? 'Yes' : place.wheelchairAccessible === false ? 'No' : 'Unknown'}
          color={place.wheelchairAccessible === true ? 'var(--green)' : place.wheelchairAccessible === false ? 'var(--red)' : 'var(--text-3)'}
        />
      )}
      <div style={{ height: 6, background: 'var(--surface-3)', borderRadius: 3, marginTop: 10, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 3,
          width: `${pct}%`,
          background: getScoreGradient(place.score),
          transition: 'width 0.4s ease',
        }} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--text-3)', fontWeight: 500, marginTop: 4 }}>
        <span>0</span><span>2.5</span><span>5.0</span>
      </div>
    </div>
  );
}

function Row({ label, value, color }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, fontWeight: 500, marginBottom: 5 }}>
      <span style={{ color: 'var(--text-2)' }}>{label}</span>
      <span style={{ color, fontWeight: 700 }}>{value}</span>
    </div>
  );
}

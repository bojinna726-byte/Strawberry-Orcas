import { getScoreLabel } from '../../utils/scoring';

export default function Badge({ score, face }) {
  const label = score === null ? 'Unknown' :
    score >= 4.5 ? 'Accessible' :
    score >= 2.5 ? 'Moderate' : 'Poor';

  const cls =
    score === null ? 'unknown'
    : score >= 4.5 ? 'accessible'
    : score >= 2.5 ? 'moderate'
    : 'poor';

  const styles = {
    accessible: { background: 'var(--green-light)', color: 'var(--green-dark)' },
    moderate:   { background: 'var(--amber-light)', color: 'var(--amber)' },
    poor:       { background: 'var(--red-light)',   color: 'var(--red)' },
    unknown:    { background: 'var(--surface-2)',   color: 'var(--text-3)' },
  };

  const emoji = face || (
    cls === 'accessible' ? '😊' :
    cls === 'moderate' ? '😐' :
    cls === 'poor' ? '😞' : '❓'
  );

  return (
    <span style={{
      ...styles[cls],
      display: 'inline-flex',
      alignItems: 'center',
      gap: 3,
      padding: '3px 8px',
      borderRadius: 'var(--r-full)',
      fontSize: 10,
      fontWeight: 600,
      letterSpacing: '0.01em',
    }}>
      {emoji} {label}
    </span>
  );
}

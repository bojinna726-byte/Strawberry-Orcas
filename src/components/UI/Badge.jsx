import { getScoreLabel, getScoreColor, getScoreFace } from '../../utils/scoring.js';

function Badge({ score }) {
  const label = getScoreLabel(score);
  const color = getScoreColor(score);
  const face = getScoreFace(score);

  return (
    <span className="badge" style={{ backgroundColor: color }}>
      {face} {label}
    </span>
  );
}

export default Badge;
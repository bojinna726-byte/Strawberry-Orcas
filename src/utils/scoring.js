export function getScoreLabel(score) {
  if (score === null || score === undefined) return 'Unrated';
  if (score >= 4.5) return 'Accessible';
  if (score >= 4.0) return 'Very Good';
  if (score >= 3.5) return 'Good';
  if (score >= 3.0) return 'Fair';
  if (score >= 2.5) return 'Below Average';
  if (score >= 2.0) return 'Poor';
  return 'Very Poor';
}

export function getScoreColor(score) {
  if (score === null || score === undefined) return 'var(--text-3)';
  if (score >= 3.5) return 'var(--green)';
  if (score >= 2.5) return 'var(--amber)';
  return 'var(--red)';
}

export function getScoreBg(score) {
  if (score === null || score === undefined) return 'var(--surface-2)';
  if (score >= 3.5) return 'var(--green-light)';
  if (score >= 2.5) return 'var(--amber-light)';
  return 'var(--red-light)';
}

export function getScoreGradient(score) {
  if (score === null || score === undefined) return 'var(--surface-3)';
  if (score >= 3.5) return 'linear-gradient(135deg, #22c55e, #16a34a)';
  if (score >= 2.5) return 'linear-gradient(135deg, #fb923c, #c2410c)';
  return 'linear-gradient(135deg, #f87171, #b91c1c)';
}

export function getScoreFace(score) {
  if (score === null || score === undefined) return '❓';
  if (score >= 4.5) return '😊';
  if (score >= 2.5) return '😐';
  return '😞';
}

export function getScoreBadge(score) {
  if (score === null || score === undefined) return 'unknown';
  if (score >= 4.5) return 'accessible';
  if (score >= 2.5) return 'moderate';
  return 'poor';
}

export function getPinClass(score) {
  if (score === null || score === undefined) return 'neutral';
  if (score >= 4.5) return 'happy';
  if (score >= 2.5) return 'neutral';
  return 'sad';
}

export function getBorderColor(score) {
  if (score === null || score === undefined) return 'var(--border)';
  if (score >= 3.5) return '#86efac';
  if (score >= 2.5) return '#fdba74';
  return '#fca5a5';
}

export function calcPlatformScore(posCount, negCount) {
  if (posCount === 0 && negCount === 0) return null;
  const total = posCount + negCount;
  const score = ((posCount * 5) - (negCount * 2.5)) / Math.max(total, 1);
  return Math.round(Math.max(0, Math.min(5, score)) * 10) / 10;
}
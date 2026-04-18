export function getScoreLabel(score) {
  if (score >= 4.5) return "Accessible";
  if (score >= 4) return "Very Good";
  if (score >= 3.5) return "Good";
  if (score >= 3) return "Fair";
  if (score >= 2.5) return "Below Average";
  if (score >= 2) return "Poor";
  return "Very Poor";
}

export function getScoreColor(score) {
  if (score > 3.5) return "var(--green)";
  if (score > 2.5) return "var(--amber)";
  return "var(--red)";
}

export function getScoreBg(score) {
  if (score > 3.5) return "var(--green-light)";
  if (score > 2.5) return "var(--amber-light)";
  return "var(--red-light)";
}

export function calcPlatformScore(posCount, negCount) {
  const total = posCount + negCount;
  const score = ((posCount * 5) - (negCount * 2.5)) / Math.max(total, 1);
  return Math.max(0, Math.min(5, score));
}

export function getScoreFace(score) {
  if (score > 4.5) return "😊";
  if (score > 2.5) return "😐";
  return "😞";
}
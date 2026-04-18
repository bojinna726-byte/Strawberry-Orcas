const AI_DETECTIONS = [
  ['Ramp detected', 'pos'],
  ['Wide doorway', 'pos'],
  ['Tactile paving', 'pos'],
  ['Elevator visible', 'pos'],
  ['Accessible signage', 'pos'],
  ['Step detected', 'neg'],
  ['Narrow entrance', 'neg'],
  ['Uneven surface', 'neg'],
];

// Simulates an AI photo scan — returns 2-3 random detections after a delay
export async function runAiScan() {
  await new Promise((resolve) => setTimeout(resolve, 1400));
  return [...AI_DETECTIONS]
    .sort(() => Math.random() - 0.5)
    .slice(0, Math.floor(Math.random() * 2) + 2);
}

export const popularCodes = ['JPN', 'PRT', 'ISL', 'CAN', 'THA', 'AUS'];

export function advisoryMeta(score) {
  if (!score) return { level: 'Unavailable', tone: 'neutral', summary: 'No advisory data is available for this destination.' };
  if (score < 2.5) return { level: 'Level 1 · Normal precautions', tone: 'safe', summary: 'Exercise normal safety precautions and stay aware of your surroundings.' };
  if (score < 3.5) return { level: 'Level 2 · Increased caution', tone: 'caution', summary: 'Use increased caution and review local safety guidance before travelling.' };
  if (score < 4.5) return { level: 'Level 3 · Reconsider travel', tone: 'reconsider', summary: 'Reconsider non-essential travel and closely monitor local conditions.' };
  return { level: 'Level 4 · Avoid travel', tone: 'danger', summary: 'Avoid travel where possible; conditions may present serious risks.' };
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-US', { notation: 'compact', maximumFractionDigits: 1 }).format(value);
}

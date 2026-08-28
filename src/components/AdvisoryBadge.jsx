import { advisoryMeta } from '../utils/advisory';

export default function AdvisoryBadge({ score, compact = false }) {
  const meta = advisoryMeta(score);
  return <span className={`advisory-badge ${meta.tone} ${compact ? 'compact' : ''}`}>{compact ? `Level ${score?.toFixed(1) ?? '—'}` : meta.level}</span>;
}

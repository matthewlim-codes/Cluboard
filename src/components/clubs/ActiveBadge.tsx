import type { Club } from '../../types/club';
import { getClubActivityLabel, isClubActive } from '../../lib/clubUtils';

interface ActiveBadgeProps {
  club: Club;
  size?: 'sm' | 'md';
}

export function ActiveBadge({ club, size = 'sm' }: ActiveBadgeProps) {
  const active = isClubActive(club);
  const label = getClubActivityLabel(club);
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-2.5 py-1';

  return (
    <span
      className={`shrink-0 rounded-full font-semibold uppercase tracking-wide ${sizeClass} ${
        active
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-neutral-100 text-neutral-500'
      }`}
    >
      {active ? 'Still active' : label}
    </span>
  );
}

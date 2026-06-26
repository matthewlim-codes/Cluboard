import { CheckCircle2 } from 'lucide-react';
import type { Club } from '../../types/club';
import { formatGradeRange, formatRelativeDate, isClubActive } from '../../lib/clubUtils';

interface IsThisForMeCardProps {
  club: Club;
}

export function IsThisForMeCard({ club }: IsThisForMeCardProps) {
  const latestPost = club.posts[0];
  const active = isClubActive(club);

  const items = [
    { label: 'Grade levels', value: formatGradeRange(club.gradeLevels) },
    { label: 'How to join', value: club.howToJoin },
    {
      label: 'Active lately',
      value: active
        ? `Yes — ${latestPost ? `posted ${formatRelativeDate(latestPost.createdAt).toLowerCase()}` : 'updated recently'}`
        : 'Quiet — check Posts for last update',
    },
    {
      label: 'New students',
      value: club.openToBeginners ? 'Welcome — no experience needed' : 'May have requirements',
    },
  ];

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <h3 className="text-sm font-semibold text-neutral-900">Is this club for me?</h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2">
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" />
            <div>
              <p className="text-xs font-medium text-neutral-500">{item.label}</p>
              <p className="text-sm text-neutral-800">{item.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

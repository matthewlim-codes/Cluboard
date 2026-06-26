import { Link } from 'react-router-dom';
import { Clock, MapPin } from 'lucide-react';
import type { Club } from '../../types/club';
import { ClubAvatar } from './ClubAvatar';

interface ClubCardProps {
  club: Club;
  compact?: boolean;
}

export function ClubCard({ club, compact = false }: ClubCardProps) {
  const latestPost = club.posts[0];

  if (compact) {
    return (
      <Link
        to={`/club/${club.id}`}
        className="flex w-28 shrink-0 flex-col items-center gap-2"
      >
        <ClubAvatar name={club.name} id={club.id} logo={club.logo} size="lg" />
        <span className="line-clamp-2 text-center text-xs font-medium text-neutral-800">
          {club.name}
        </span>
      </Link>
    );
  }

  return (
    <Link
      to={`/club/${club.id}`}
      className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-md active:scale-[0.99]"
    >
      <ClubAvatar name={club.name} id={club.id} logo={club.logo} size="lg" />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="truncate font-semibold text-neutral-900">{club.name}</h3>
          {club.featured && (
            <span className="shrink-0 rounded-full bg-pink-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-pink-600">
              Featured
            </span>
          )}
        </div>
        <p className="mt-0.5 line-clamp-2 text-sm text-neutral-500">{club.description}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-neutral-600">
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3 text-neutral-400" />
            {club.meetingTime}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-neutral-400" />
            {club.meetingLocation}
          </span>
        </div>
        {latestPost && (
          <p className="mt-2 truncate text-xs text-neutral-400">
            Latest: {latestPost.title}
          </p>
        )}
      </div>
    </Link>
  );
}

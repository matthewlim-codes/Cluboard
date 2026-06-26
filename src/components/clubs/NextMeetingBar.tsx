import { Clock, MapPin, Users } from 'lucide-react';
import type { Club } from '../../types/club';
import { DAY_LABELS } from '../../types/club';
import { formatGradeRange } from '../../lib/clubUtils';
import { AddToCalendar } from '../ui/AddToCalendar';
import { CopyButton } from '../ui/CopyButton';

interface NextMeetingBarProps {
  club: Club;
}

export function NextMeetingBar({ club }: NextMeetingBarProps) {
  const dayLabel =
    club.meetingDays.length > 0
      ? club.meetingDays.map((d) => DAY_LABELS[d]).join(' · ')
      : 'See schedule';

  return (
    <div className="mt-4 rounded-2xl border border-pink-200 bg-gradient-to-r from-pink-50 to-purple-50 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
        Next meeting
      </p>
      <div className="mt-2 space-y-1.5">
        <p className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <Clock className="h-4 w-4 shrink-0 text-pink-500" />
          {dayLabel} · {club.meetingTime}
        </p>
        <p className="flex items-center gap-2 text-sm text-neutral-700">
          <MapPin className="h-4 w-4 shrink-0 text-pink-500" />
          {club.meetingLocation}
          <CopyButton text={club.meetingLocation} label="Copy room" />
        </p>
        <p className="flex items-center gap-2 text-sm text-neutral-700">
          <Users className="h-4 w-4 shrink-0 text-pink-500" />
          {formatGradeRange(club.gradeLevels)}
        </p>
      </div>
      <div className="mt-3">
        <AddToCalendar club={club} />
      </div>
    </div>
  );
}

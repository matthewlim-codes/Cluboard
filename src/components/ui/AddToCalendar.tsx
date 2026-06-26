import { CalendarPlus } from 'lucide-react';
import { buildGoogleCalendarUrl, downloadIcsFile } from '../../lib/calendar';
import type { Club } from '../../types/club';

interface AddToCalendarProps {
  club: Club;
}

export function AddToCalendar({ club }: AddToCalendarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={buildGoogleCalendarUrl(club)}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
      >
        <CalendarPlus className="h-3.5 w-3.5 text-pink-500" />
        Google Calendar
      </a>
      <button
        type="button"
        onClick={() => downloadIcsFile(club)}
        className="inline-flex items-center gap-1.5 rounded-xl border border-neutral-200 px-3 py-2 text-xs font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
      >
        <CalendarPlus className="h-3.5 w-3.5 text-pink-500" />
        Download .ics
      </button>
    </div>
  );
}

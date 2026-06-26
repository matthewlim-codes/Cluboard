import type { ClubFilters } from '../../lib/clubUtils';
import { getTodayDayOfWeek } from '../../lib/clubUtils';

interface NewHereStripProps {
  onApply: (filters: Partial<ClubFilters>) => void;
}

export function NewHereStrip({ onApply }: NewHereStripProps) {
  const today = getTodayDayOfWeek();
  const todayLabel = today
    ? `Meets ${today.charAt(0).toUpperCase() + today.slice(1)}`
    : 'Meets this week';

  const chips = [
    {
      label: today ? 'Clubs meeting today' : todayLabel,
      filters: today ? { day: today } : {},
    },
    {
      label: 'Open to 9th graders',
      filters: { grade: '9' as const },
    },
    {
      label: 'No experience needed',
      filters: { openToBeginnersOnly: true },
    },
  ];

  return (
    <section className="border-b border-neutral-100 px-4 py-3">
      <p className="mb-2 text-xs font-semibold text-neutral-700">New here?</p>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {chips.map((chip) => (
          <button
            key={chip.label}
            type="button"
            onClick={() => onApply(chip.filters)}
            className="shrink-0 rounded-full border border-pink-200 bg-pink-50 px-4 py-2.5 text-xs font-semibold text-pink-700 transition-colors hover:bg-pink-100 active:scale-[0.98]"
          >
            {chip.label}
          </button>
        ))}
      </div>
    </section>
  );
}

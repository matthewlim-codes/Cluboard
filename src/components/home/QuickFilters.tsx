import type { ClubFilters, IntentPreset } from '../../lib/clubUtils';
import { getTodayDayOfWeek, INTENT_PRESETS } from '../../lib/clubUtils';

interface QuickFiltersProps {
  filters: ClubFilters;
  onChange: (filters: ClubFilters) => void;
  showMore: boolean;
  onToggleMore: () => void;
}

export function QuickFilters({
  filters,
  onChange,
  showMore,
  onToggleMore,
}: QuickFiltersProps) {
  const today = getTodayDayOfWeek();

  const QUICK_CHIPS: { label: string; patch: Partial<ClubFilters>; clear?: Partial<ClubFilters> }[] = [
    ...(today
      ? [{ label: 'Today', patch: { day: today }, clear: { day: '' } }]
      : []),
    { label: 'Service', patch: { category: 'service' }, clear: { category: '' } },
    { label: 'Active', patch: { activeOnly: true }, clear: { activeOnly: false } },
    { label: '9th grade', patch: { grade: '9' as const }, clear: { grade: '' as const } },
  ];

  const isChipActive = (patch: Partial<ClubFilters>) =>
    Object.entries(patch).every(
      ([key, value]) => filters[key as keyof ClubFilters] === value,
    );

  return (
    <div className="space-y-2">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        {QUICK_CHIPS.map((chip) => {
          const active = isChipActive(chip.patch);
          return (
            <button
              key={chip.label}
              type="button"
              onClick={() =>
                onChange(
                  active
                    ? { ...filters, ...(chip.clear ?? {}) }
                    : { ...filters, ...chip.patch },
                )
              }
              className={`shrink-0 rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors ${
                active
                  ? 'border-pink-500 bg-pink-500 text-white'
                  : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
              }`}
            >
              {chip.label}
            </button>
          );
        })}
        <button
          type="button"
          onClick={onToggleMore}
          className="shrink-0 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:border-neutral-300"
        >
          {showMore ? 'Fewer filters' : 'More filters'}
        </button>
      </div>
    </div>
  );
}

interface IntentEntryPointsProps {
  onSelect: (preset: IntentPreset) => void;
}

export function IntentEntryPoints({ onSelect }: IntentEntryPointsProps) {
  return (
    <section className="px-4 py-3">
      <p className="mb-2 text-xs font-semibold text-neutral-700">I&apos;m looking for…</p>
      <div className="grid grid-cols-2 gap-2">
        {INTENT_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset)}
            className="flex items-center gap-2 rounded-2xl border border-neutral-200 bg-white p-3 text-left transition-colors hover:border-pink-200 hover:bg-pink-50 active:scale-[0.99]"
          >
            <span className="text-lg">{preset.emoji}</span>
            <span className="text-xs font-semibold text-neutral-800">{preset.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

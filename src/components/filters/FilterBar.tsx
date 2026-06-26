import type { ClubFilters } from '../../lib/clubUtils';
import {
  CATEGORY_LABELS,
  DAY_LABELS,
  GRADE_LABELS,
  type ClubCategory,
  type DayOfWeek,
  type GradeLevel,
} from '../../types/club';

interface FilterBarProps {
  filters: ClubFilters;
  onChange: (filters: ClubFilters) => void;
  showSort?: boolean;
}

export function FilterBar({ filters, onChange, showSort = false }: FilterBarProps) {
  const update = (patch: Partial<ClubFilters>) =>
    onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        <FilterChip
          label="All categories"
          active={!filters.category}
          onClick={() => update({ category: '' })}
        />
        {(Object.entries(CATEGORY_LABELS) as [ClubCategory, string][]).map(
          ([value, label]) => (
            <FilterChip
              key={value}
              label={label}
              active={filters.category === value}
              onClick={() => update({ category: value })}
            />
          ),
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        <FilterChip
          label="Any day"
          active={!filters.day}
          onClick={() => update({ day: '' })}
        />
        {(Object.entries(DAY_LABELS) as [DayOfWeek, string][]).map(
          ([value, label]) => (
            <FilterChip
              key={value}
              label={label}
              active={filters.day === value}
              onClick={() => update({ day: value })}
            />
          ),
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
        <FilterChip
          label="All grades"
          active={!filters.grade}
          onClick={() => update({ grade: '' })}
        />
        {(Object.entries(GRADE_LABELS) as [GradeLevel, string][]).map(
          ([value, label]) => (
            <FilterChip
              key={value}
              label={label}
              active={filters.grade === value}
              onClick={() => update({ grade: value })}
            />
          ),
        )}
      </div>

      {showSort && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar">
          <FilterChip
            label="Featured"
            active={filters.sort === 'featured'}
            onClick={() => update({ sort: 'featured' })}
          />
          <FilterChip
            label="Newest"
            active={filters.sort === 'newest'}
            onClick={() => update({ sort: 'newest' })}
          />
          <FilterChip
            label="Most active"
            active={filters.sort === 'most-active'}
            onClick={() => update({ sort: 'most-active' })}
          />
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'border-pink-500 bg-pink-500 text-white'
          : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
      }`}
    >
      {label}
    </button>
  );
}

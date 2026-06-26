import { useState } from 'react';
import { AppShell, PageHeader } from '../components/layout/AppShell';
import { ClubCard } from '../components/clubs/ClubCard';
import { FilterBar } from '../components/filters/FilterBar';
import { SearchInput } from '../components/ui/SearchInput';
import { useClubs } from '../context/ClubsContext';
import { DEFAULT_FILTERS, filterAndSortClubs, type ClubFilters } from '../lib/clubUtils';

export function ExplorePage() {
  const { clubs } = useClubs();
  const [filters, setFilters] = useState<ClubFilters>({
    ...DEFAULT_FILTERS,
    sort: 'most-active',
  });
  const filtered = filterAndSortClubs(clubs, filters);

  return (
    <AppShell>
      <PageHeader
        title="Explore"
        subtitle="Search and discover school clubs"
      />

      <section className="space-y-3 px-4 py-4">
        <SearchInput
          value={filters.query}
          onChange={(query) => setFilters({ ...filters, query })}
          placeholder="Search by name, keyword, or location..."
        />
        <FilterBar filters={filters} onChange={setFilters} showSort />
      </section>

      <section className="px-4 pb-4">
        <p className="mb-3 text-xs text-neutral-500">
          {filtered.length} club{filtered.length !== 1 ? 's' : ''} found
        </p>
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-200 py-12 text-center">
              <p className="text-sm font-medium text-neutral-600">Nothing here yet</p>
              <p className="mt-1 text-xs text-neutral-400">
                Open the Cluboard — create a club to get started
              </p>
            </div>
          ) : (
            filtered.map((club) => <ClubCard key={club.id} club={club} />)
          )}
        </div>
      </section>
    </AppShell>
  );
}

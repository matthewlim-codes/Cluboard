import { useState } from 'react';
import { AppShell, PageHeader } from '../components/layout/AppShell';
import { FeaturedClubsRow } from '../components/clubs/FeaturedClubsRow';
import { ClubCard } from '../components/clubs/ClubCard';
import { PostCard } from '../components/feed/PostCard';
import { FilterBar } from '../components/filters/FilterBar';
import { SearchInput } from '../components/ui/SearchInput';
import { useClubs } from '../context/ClubsContext';
import {
  DEFAULT_FILTERS,
  filterAndSortClubs,
  getRecentPosts,
  type ClubFilters,
} from '../lib/clubUtils';

export function HomePage() {
  const { clubs } = useClubs();
  const [filters, setFilters] = useState<ClubFilters>(DEFAULT_FILTERS);
  const filtered = filterAndSortClubs(clubs, filters);
  const recentPosts = getRecentPosts(clubs, 5);

  return (
    <AppShell>
      <PageHeader branding />
      <FeaturedClubsRow />

      <section className="space-y-3 px-4 py-4">
        <SearchInput
          value={filters.query}
          onChange={(query) => setFilters({ ...filters, query })}
          placeholder="Search clubs by name or keyword..."
        />
        <FilterBar filters={filters} onChange={setFilters} />
      </section>

      <section className="px-4 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-neutral-900">
            All Clubs
            <span className="ml-1.5 font-normal text-neutral-400">
              ({filtered.length})
            </span>
          </h2>
          <p className="text-xs text-neutral-400">Find what&apos;s inside</p>
        </div>
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((club) => <ClubCard key={club.id} club={club} />)
          )}
        </div>
      </section>

      {recentPosts.length > 0 && (
        <section className="border-t border-neutral-100 px-4 py-5">
          <h2 className="mb-3 text-sm font-semibold text-neutral-900">Recent Updates</h2>
          <div className="space-y-3">
            {recentPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                clubId={post.clubId}
                clubName={post.clubName}
                clubLogo={post.clubLogo}
              />
            ))}
          </div>
        </section>
      )}
    </AppShell>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-200 py-12 text-center">
      <p className="text-sm font-medium text-neutral-600">No clubs match your filters</p>
      <p className="mt-1 text-xs text-neutral-400">Try adjusting your search or filters</p>
    </div>
  );
}

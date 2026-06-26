import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppShell, PageHeader } from '../components/layout/AppShell';
import { FeaturedClubsRow, FreshArrivalsRow } from '../components/clubs/FeaturedClubsRow';
import { ClubCard } from '../components/clubs/ClubCard';
import { PostCard } from '../components/feed/PostCard';
import { FilterBar } from '../components/filters/FilterBar';
import { SearchInput } from '../components/ui/SearchInput';
import { NewHereStrip } from '../components/home/NewHereStrip';
import { IntentEntryPoints, QuickFilters } from '../components/home/QuickFilters';
import { MissingClubCta } from '../components/onboarding/OnboardingModal';
import { useClubs } from '../context/ClubsContext';
import { useUserPrefs } from '../context/UserPrefsContext';
import {
  applyIntentPreset,
  DEFAULT_FILTERS,
  filterAndSortClubs,
  getRecentPosts,
  matchesUserInterests,
  type ClubFilters,
} from '../lib/clubUtils';

export function HomePage() {
  const { clubs } = useClubs();
  const { prefs } = useUserPrefs();
  const [filters, setFilters] = useState<ClubFilters>(() => ({
    ...DEFAULT_FILTERS,
    grade: prefs.grade || '',
  }));
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  useEffect(() => {
    if (prefs.grade) {
      setFilters((f) => ({ ...f, grade: prefs.grade }));
    }
  }, [prefs.grade]);

  let filtered = filterAndSortClubs(clubs, filters);
  if (prefs.interests.length > 0 && !filters.category) {
    filtered = filtered.filter((c) => matchesUserInterests(c, prefs.interests));
  }
  const recentPosts = getRecentPosts(clubs, 5);

  const applyQuickFilters = (patch: Partial<ClubFilters>) => {
    setFilters({ ...DEFAULT_FILTERS, grade: prefs.grade || '', ...patch });
  };

  return (
    <AppShell>
      <PageHeader branding />
      <div className="border-b border-neutral-100 px-4 py-2">
        <p className="text-center text-xs text-neutral-500">
          Browse clubs · See when they meet · Find one to join
        </p>
      </div>

      <NewHereStrip onApply={applyQuickFilters} />
      <FeaturedClubsRow />
      <FreshArrivalsRow />
      <IntentEntryPoints
        onSelect={(preset) => {
          setFilters(applyIntentPreset(preset, prefs.grade));
          setShowMoreFilters(true);
        }}
      />

      <section className="space-y-3 px-4 py-4">
        <SearchInput
          value={filters.query}
          onChange={(query) => setFilters({ ...filters, query })}
          placeholder="Search clubs by name or keyword..."
        />
        <QuickFilters
          filters={filters}
          onChange={setFilters}
          showMore={showMoreFilters}
          onToggleMore={() => setShowMoreFilters((v) => !v)}
        />
        {showMoreFilters && (
          <FilterBar filters={filters} onChange={setFilters} />
        )}
      </section>

      <section className="px-4 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-neutral-900">
              Open the cupboard
              <span className="ml-1.5 font-normal text-neutral-400">
                ({filtered.length})
              </span>
            </h2>
            <p className="text-[10px] text-neutral-400">All clubs in the Cluboard</p>
          </div>
        </div>
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((club) => <ClubCard key={club.id} club={club} showSave />)
          )}
        </div>
      </section>

      <MissingClubCta />

      {recentPosts.length > 0 && (
        <section className="border-t border-neutral-100 px-4 py-5">
          <h2 className="text-sm font-semibold text-neutral-900">
            What&apos;s happening this week
          </h2>
          <p className="mb-3 text-xs text-neutral-500">
            Recent announcements from clubs
          </p>
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
      <Link to="/create" className="mt-3 inline-block text-sm font-medium text-pink-600">
        Add a club to the Cluboard
      </Link>
    </div>
  );
}

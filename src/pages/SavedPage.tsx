import { Link } from 'react-router-dom';
import { Bookmark, Info, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { AppShell, PageHeader } from '../components/layout/AppShell';
import { ClubCard } from '../components/clubs/ClubCard';
import { useClubs } from '../context/ClubsContext';
import { useUserPrefs } from '../context/UserPrefsContext';

export function SavedPage() {
  const { clubs, resetClubs } = useClubs();
  const { prefs, resetOnboarding } = useUserPrefs();
  const [confirmReset, setConfirmReset] = useState(false);
  const savedClubs = clubs.filter((c) => prefs.savedClubIds.includes(c.id));

  return (
    <AppShell>
      <PageHeader title="Saved" subtitle="Your shortlist of clubs" />

      <div className="px-4 py-4">
        {savedClubs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-neutral-200 py-12 text-center">
            <Bookmark className="mx-auto h-8 w-8 text-neutral-300" />
            <p className="mt-3 text-sm font-medium text-neutral-600">No saved clubs yet</p>
            <p className="mt-1 text-xs text-neutral-400">
              Tap the bookmark on any club to build your shortlist
            </p>
            <Link to="/" className="mt-4 inline-block text-sm font-medium text-pink-600">
              Browse clubs
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-neutral-500">
              {savedClubs.length} club{savedClubs.length !== 1 ? 's' : ''} saved
            </p>
            {savedClubs.map((club) => (
              <ClubCard key={club.id} club={club} showSave />
            ))}
          </div>
        )}
      </div>

      <section className="mx-4 mt-4 rounded-2xl border border-neutral-200 p-4">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-pink-500" />
          <h3 className="text-sm font-semibold text-neutral-900">About Cluboard</h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          What&apos;s in the Cluboard? A school club directory first, activity feed second.
          Find what&apos;s inside your school&apos;s clubs — no login required.
        </p>
        {prefs.grade && (
          <p className="mt-2 text-xs text-neutral-500">Your grade: {prefs.grade}th</p>
        )}
        <button
          type="button"
          onClick={resetOnboarding}
          className="mt-2 text-xs font-medium text-pink-600"
        >
          Update grade &amp; interests
        </button>
      </section>

      <section className="mx-4 mt-4 mb-6 rounded-2xl border border-neutral-200 p-4">
        <h3 className="text-sm font-semibold text-neutral-900">Demo controls</h3>
        <p className="mt-1 text-xs text-neutral-500">
          Reset clubs to seed data (NHS &amp; Interact).
        </p>
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="mt-3 flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            <RotateCcw className="h-4 w-4" />
            Reset demo data
          </button>
        ) : (
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() => {
                resetClubs();
                setConfirmReset(false);
              }}
              className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-medium text-white"
            >
              Confirm reset
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700"
            >
              Cancel
            </button>
          </div>
        )}
      </section>
    </AppShell>
  );
}

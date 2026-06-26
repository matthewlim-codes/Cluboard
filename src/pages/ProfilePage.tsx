import { useState } from 'react';
import { BookOpen, Heart, RotateCcw, Sparkles } from 'lucide-react';
import { AppShell, PageHeader } from '../components/layout/AppShell';
import { useClubs } from '../context/ClubsContext';

export function ProfilePage() {
  const { clubs, resetClubs } = useClubs();
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <AppShell>
      <PageHeader
        title="Cluboard"
        subtitle="Your school club directory"
      />

      <div className="px-4 py-6">
        <div className="rounded-2xl bg-gradient-to-br from-pink-500 via-purple-500 to-orange-400 p-6 text-white">
          <h2 className="text-2xl font-bold">What&apos;s in the Cluboard?</h2>
          <p className="mt-2 text-sm leading-relaxed text-white/90">
            Find what&apos;s inside your school&apos;s clubs. Browse, discover, and keep
            club info up to date — no login required.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <StatCard icon={BookOpen} label="Clubs" value={clubs.length} />
          <StatCard
            icon={Sparkles}
            label="Featured"
            value={clubs.filter((c) => c.featured).length}
          />
          <StatCard
            icon={Heart}
            label="Total posts"
            value={clubs.reduce((sum, c) => sum + c.posts.length, 0)}
          />
          <StatCard icon={BookOpen} label="Categories" value={new Set(clubs.map((c) => c.category)).size} />
        </div>

        <section className="mt-8">
          <h3 className="text-sm font-semibold text-neutral-900">About Cluboard</h3>
          <p className="mt-2 text-sm leading-relaxed text-neutral-600">
            Cluboard is a school club directory first and an activity feed second.
            Anyone can create or edit club pages to keep information fresh. Open the
            Cluboard and see what your school has to offer.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-neutral-200 p-4">
          <h3 className="text-sm font-semibold text-neutral-900">Demo controls</h3>
          <p className="mt-1 text-xs text-neutral-500">
            Reset all clubs back to the original seed data (NHS &amp; Interact).
          </p>
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="mt-3 flex items-center gap-2 rounded-xl border border-neutral-200 px-4 py-2.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50"
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

        <p className="mt-8 text-center text-xs text-neutral-400">
          Cluboard MVP · No login · Edit any club directly
        </p>
      </div>
    </AppShell>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof BookOpen;
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-4">
      <Icon className="h-5 w-5 text-pink-500" />
      <p className="mt-2 text-2xl font-bold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  );
}

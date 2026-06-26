import { useClubs } from '../../context/ClubsContext';
import { getFeaturedClubs } from '../../lib/clubUtils';
import { ClubCard } from './ClubCard';

export function FeaturedClubsRow() {
  const { clubs } = useClubs();
  const featured = getFeaturedClubs(clubs);

  if (featured.length === 0) return null;

  return (
    <section className="border-b border-neutral-100 pb-4">
      <div className="mb-3 flex items-center justify-between px-4">
        <h2 className="text-sm font-semibold text-neutral-900">Featured Clubs</h2>
        <span className="text-xs text-neutral-400">Open the Cluboard</span>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 hide-scrollbar">
        {featured.map((club) => (
          <ClubCard key={club.id} club={club} compact />
        ))}
      </div>
    </section>
  );
}

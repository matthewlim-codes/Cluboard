import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
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
        <div>
          <h2 className="text-sm font-semibold text-neutral-900">On the shelf</h2>
          <p className="text-[10px] text-neutral-400">Featured clubs in the cupboard</p>
        </div>
        <span className="text-xs text-pink-600">Open the Cluboard</span>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 hide-scrollbar">
        {featured.map((club) => (
          <ClubCard key={club.id} club={club} compact />
        ))}
      </div>
    </section>
  );
}

export function FreshArrivalsRow() {
  const { clubs } = useClubs();
  const fresh = [...clubs]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  if (fresh.length === 0) return null;

  return (
    <section className="border-b border-neutral-100 py-4">
      <div className="mb-3 px-4">
        <h2 className="text-sm font-semibold text-neutral-900">Fresh arrivals</h2>
        <p className="text-[10px] text-neutral-400">Newly added to the cupboard</p>
      </div>
      <div className="flex gap-4 overflow-x-auto px-4 hide-scrollbar">
        {fresh.map((club) => (
          <ClubCard key={club.id} club={club} compact />
        ))}
      </div>
    </section>
  );
}

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';

export function ShareClubLink({ clubId }: { clubId: string; clubName?: string }) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/club/${clubId}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={copyLink}
      className="inline-flex items-center gap-1 text-xs font-medium text-pink-600 hover:underline"
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          Link copied!
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          Copy link for club fair / QR
        </>
      )}
    </button>
  );
}

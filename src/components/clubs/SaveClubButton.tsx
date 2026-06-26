import { Bookmark } from 'lucide-react';
import { useUserPrefs } from '../../context/UserPrefsContext';

interface SaveClubButtonProps {
  clubId: string;
  variant?: 'icon' | 'button';
}

export function SaveClubButton({ clubId, variant = 'icon' }: SaveClubButtonProps) {
  const { isClubSaved, toggleSavedClub } = useUserPrefs();
  const saved = isClubSaved(clubId);

  if (variant === 'button') {
    return (
      <button
        type="button"
        onClick={() => toggleSavedClub(clubId)}
        className={`flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-medium transition-colors ${
          saved
            ? 'border-pink-500 bg-pink-50 text-pink-600'
            : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
        }`}
      >
        <Bookmark className={`h-3.5 w-3.5 ${saved ? 'fill-current' : ''}`} />
        {saved ? 'Saved' : 'Save club'}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggleSavedClub(clubId)}
      aria-label={saved ? 'Remove from saved' : 'Save club'}
      className="rounded-lg p-1.5 text-neutral-600 transition-colors hover:bg-neutral-100"
    >
      <Bookmark className={`h-5 w-5 ${saved ? 'fill-pink-500 text-pink-500' : ''}`} />
    </button>
  );
}

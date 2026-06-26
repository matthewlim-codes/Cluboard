import { Compass, Home, Bookmark, PlusSquare } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useUserPrefs } from '../../context/UserPrefsContext';

const navItems = [
  { to: '/', icon: Home, label: 'Clubs' },
  { to: '/explore', icon: Compass, label: 'Search' },
  { to: '/create', icon: PlusSquare, label: 'Add' },
  { to: '/saved', icon: Bookmark, label: 'Saved' },
];

export function BottomNav() {
  const { prefs } = useUserPrefs();
  const savedCount = prefs.savedClubIds.length;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white safe-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `relative flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${
                isActive ? 'text-neutral-900' : 'text-neutral-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className="h-6 w-6"
                  strokeWidth={isActive ? 2.5 : 1.75}
                  fill={isActive && to === '/saved' ? 'currentColor' : 'none'}
                />
                {to === '/saved' && savedCount > 0 && (
                  <span className="absolute right-2 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-pink-500 px-1 text-[9px] font-bold text-white">
                    {savedCount}
                  </span>
                )}
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

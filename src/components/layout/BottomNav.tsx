import { NavLink } from 'react-router-dom';
import { Compass, Home, PlusSquare, User } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/explore', icon: Compass, label: 'Explore' },
  { to: '/create', icon: PlusSquare, label: 'Create' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-200 bg-white safe-bottom">
      <div className="mx-auto flex max-w-lg items-center justify-around px-2 py-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-4 py-1 transition-colors ${
                isActive ? 'text-neutral-900' : 'text-neutral-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  className="h-6 w-6"
                  strokeWidth={isActive ? 2.5 : 1.75}
                  fill={isActive ? 'currentColor' : 'none'}
                />
                <span className="text-[10px] font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

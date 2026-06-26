import { Link } from 'react-router-dom';
import { getClubColor, getClubInitials } from '../../lib/clubUtils';

interface ClubAvatarProps {
  name: string;
  id: string;
  logo?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  sm: 'h-10 w-10 text-xs',
  md: 'h-12 w-12 text-sm',
  lg: 'h-16 w-16 text-base',
  xl: 'h-20 w-20 text-lg',
};

export function ClubAvatar({ name, id, logo, size = 'md', className = '' }: ClubAvatarProps) {
  const sizeClass = sizeClasses[size];

  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        className={`${sizeClass} rounded-full object-cover ring-2 ring-white ${className}`}
      />
    );
  }

  return (
    <div
      className={`${sizeClass} ${getClubColor(id)} flex shrink-0 items-center justify-center rounded-full font-semibold text-white ring-2 ring-white ${className}`}
      aria-hidden
    >
      {getClubInitials(name)}
    </div>
  );
}

interface ClubAvatarLinkProps extends ClubAvatarProps {
  clubId: string;
}

export function ClubAvatarLink({ clubId, ...props }: ClubAvatarLinkProps) {
  return (
    <Link to={`/club/${clubId}`} className="shrink-0">
      <ClubAvatar {...props} />
    </Link>
  );
}

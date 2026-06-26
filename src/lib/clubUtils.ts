import type { Club, DayOfWeek, GradeLevel, SortOption } from '../types/club';

export interface ClubFilters {
  query: string;
  category: string;
  day: string;
  grade: string;
  sort: SortOption;
}

export const DEFAULT_FILTERS: ClubFilters = {
  query: '',
  category: '',
  day: '',
  grade: '',
  sort: 'featured',
};

export function filterAndSortClubs(clubs: Club[], filters: ClubFilters): Club[] {
  let result = [...clubs];

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.meetingLocation.toLowerCase().includes(q),
    );
  }

  if (filters.category) {
    result = result.filter((c) => c.category === filters.category);
  }

  if (filters.day) {
    result = result.filter((c) =>
      c.meetingDays.includes(filters.day as DayOfWeek),
    );
  }

  if (filters.grade) {
    result = result.filter((c) =>
      c.gradeLevels.includes(filters.grade as GradeLevel),
    );
  }

  switch (filters.sort) {
    case 'newest':
      result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
    case 'most-active':
      result.sort((a, b) => {
        const aLatest = a.posts[0]?.createdAt ?? a.updatedAt;
        const bLatest = b.posts[0]?.createdAt ?? b.updatedAt;
        return new Date(bLatest).getTime() - new Date(aLatest).getTime();
      });
      break;
    case 'featured':
    default:
      result.sort((a, b) => {
        if (a.featured !== b.featured) return a.featured ? -1 : 1;
        return a.name.localeCompare(b.name);
      });
      break;
  }

  return result;
}

export function getFeaturedClubs(clubs: Club[]): Club[] {
  return clubs.filter((c) => c.featured);
}

export function getRecentPosts(clubs: Club[], limit = 10) {
  return clubs
    .flatMap((club) =>
      club.posts.map((post) => ({ ...post, clubId: club.id, clubName: club.name, clubLogo: club.logo })),
    )
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

export function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function getClubInitials(name: string): string {
  return name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export function getClubColor(id: string): string {
  const colors = [
    'bg-gradient-to-br from-pink-500 to-rose-500',
    'bg-gradient-to-br from-purple-500 to-indigo-500',
    'bg-gradient-to-br from-blue-500 to-cyan-500',
    'bg-gradient-to-br from-emerald-500 to-teal-500',
    'bg-gradient-to-br from-orange-500 to-amber-500',
    'bg-gradient-to-br from-red-500 to-pink-500',
  ];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

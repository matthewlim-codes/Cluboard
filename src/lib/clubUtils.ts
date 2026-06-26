import type { Club, ClubCategory, DayOfWeek, GradeLevel, SortOption } from '../types/club';
import { DAY_LABELS } from '../types/club';

export interface ClubFilters {
  query: string;
  category: string;
  day: string;
  grade: string;
  sort: SortOption;
  openToBeginnersOnly?: boolean;
  activeOnly?: boolean;
  singleMeetingDay?: boolean;
}

export const DEFAULT_FILTERS: ClubFilters = {
  query: '',
  category: '',
  day: '',
  grade: '',
  sort: 'featured',
};

const ACTIVE_DAYS = 14;

export function getTodayDayOfWeek(): DayOfWeek | null {
  const map: Record<number, DayOfWeek | null> = {
    0: null,
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: null,
  };
  return map[new Date().getDay()] ?? null;
}

export function isClubActive(club: Club): boolean {
  const latest = club.posts[0]?.createdAt ?? club.updatedAt;
  const diffMs = Date.now() - new Date(latest).getTime();
  return diffMs <= ACTIVE_DAYS * 24 * 60 * 60 * 1000;
}

export function getClubActivityLabel(club: Club): string {
  const latest = club.posts[0]?.createdAt ?? club.updatedAt;
  const diffDays = Math.floor(
    (Date.now() - new Date(latest).getTime()) / (1000 * 60 * 60 * 24),
  );
  if (diffDays === 0) return 'Active today';
  if (diffDays <= ACTIVE_DAYS) return `Active · posted ${diffDays}d ago`;
  return 'Quiet lately';
}

export function getClubTagline(club: Club): string {
  return club.tagline || club.description.slice(0, 60) + (club.description.length > 60 ? '…' : '');
}

export function formatGradeRange(grades: GradeLevel[]): string {
  if (grades.length === 4) return 'Grades 9–12';
  if (grades.length === 0) return 'All grades';
  return `Grades ${grades.join(', ')}`;
}

export function filterAndSortClubs(clubs: Club[], filters: ClubFilters): Club[] {
  let result = [...clubs];

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    result = result.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
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

  if (filters.openToBeginnersOnly) {
    result = result.filter((c) => c.openToBeginners);
  }

  if (filters.activeOnly) {
    result = result.filter((c) => isClubActive(c));
  }

  if (filters.singleMeetingDay) {
    result = result.filter((c) => c.meetingDays.length === 1);
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

export function getFreshClubs(clubs: Club[], limit = 5): Club[] {
  return [...clubs]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

export function getClubsMeetingToday(clubs: Club[]): Club[] {
  const today = getTodayDayOfWeek();
  if (!today) return [];
  return clubs.filter((c) => c.meetingDays.includes(today));
}

export function getRecentPosts(clubs: Club[], limit = 10) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return clubs
    .flatMap((club) =>
      club.posts.map((post) => ({
        ...post,
        clubId: club.id,
        clubName: club.name,
        clubLogo: club.logo,
      })),
    )
    .filter((post) => new Date(post.createdAt).getTime() >= weekAgo)
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

export function getNextMeetingSummary(club: Club): string {
  const days = club.meetingDays.map((d) => DAY_LABELS[d].slice(0, 3)).join(' · ');
  const grades = formatGradeRange(club.gradeLevels);
  return `${days || 'TBD'} · ${club.meetingTime} · ${club.meetingLocation} · ${grades}`;
}

export type IntentPreset = {
  id: string;
  label: string;
  emoji: string;
  filters: Partial<ClubFilters>;
};

export const INTENT_PRESETS: IntentPreset[] = [
  {
    id: 'service-hours',
    label: 'Service hours',
    emoji: '🤝',
    filters: { category: 'service', activeOnly: true },
  },
  {
    id: 'leadership',
    label: 'Leadership',
    emoji: '⭐',
    filters: { category: 'leadership' },
  },
  {
    id: 'new-friendly',
    label: 'New student friendly',
    emoji: '👋',
    filters: { openToBeginnersOnly: true },
  },
  {
    id: 'busy-schedule',
    label: 'One day a week',
    emoji: '📅',
    filters: { singleMeetingDay: true, sort: 'featured' },
  },
];

export function applyIntentPreset(
  preset: IntentPreset,
  grade?: GradeLevel | '',
): ClubFilters {
  return {
    ...DEFAULT_FILTERS,
    ...preset.filters,
    grade: grade || '',
    sort: preset.filters.sort ?? 'most-active',
  };
}

export function matchesUserInterests(club: Club, interests: ClubCategory[]): boolean {
  if (interests.length === 0) return true;
  return interests.includes(club.category);
}

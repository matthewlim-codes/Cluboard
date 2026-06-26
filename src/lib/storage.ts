import { SEED_CLUBS } from '../data/seedClubs';
import type { Club } from '../types/club';

const STORAGE_KEY = 'cluboard_clubs';

import { SEED_CLUBS } from '../data/seedClubs';
import type { Club } from '../types/club';

const STORAGE_KEY = 'cluboard_clubs';

function migrateClub(club: Club): Club {
  return {
    ...club,
    tagline: club.tagline ?? club.description.slice(0, 60),
    howToJoin: club.howToJoin ?? 'Show up to the next meeting',
    openToBeginners:
      club.openToBeginners ??
      (club.gradeLevels?.includes('9') || club.tags?.includes('beginner-friendly')),
  };
}

export function loadClubs(): Club[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveClubs(SEED_CLUBS);
      return SEED_CLUBS;
    }
    const clubs = (JSON.parse(raw) as Club[]).map(migrateClub);
    return clubs;
  } catch {
    return SEED_CLUBS;
  }
}

export function saveClubs(clubs: Club[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(clubs));
}

export function generateId(): string {
  return `club-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function generatePostId(): string {
  return `post-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function resetToSeed(): Club[] {
  saveClubs(SEED_CLUBS);
  return SEED_CLUBS;
}

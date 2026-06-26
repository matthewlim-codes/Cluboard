import { SEED_CLUBS } from '../data/seedClubs';
import type { Club } from '../types/club';

const STORAGE_KEY = 'cluboard_clubs';

export function loadClubs(): Club[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveClubs(SEED_CLUBS);
      return SEED_CLUBS;
    }
    return JSON.parse(raw) as Club[];
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

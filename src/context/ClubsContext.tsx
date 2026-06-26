import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { loadClubs, saveClubs, generateId, generatePostId } from '../lib/storage';
import { SEED_CLUBS } from '../data/seedClubs';
import type { Club, ClubFormData, Post } from '../types/club';

interface ClubsContextValue {
  clubs: Club[];
  getClub: (id: string) => Club | undefined;
  createClub: (data: ClubFormData) => Club;
  updateClub: (id: string, data: ClubFormData) => Club | undefined;
  addPost: (clubId: string, post: Omit<Post, 'id' | 'createdAt'>) => void;
  resetClubs: () => void;
}

const ClubsContext = createContext<ClubsContextValue | null>(null);

export function ClubsProvider({ children }: { children: ReactNode }) {
  const [clubs, setClubs] = useState<Club[]>(() => loadClubs());

  const persist = useCallback((next: Club[]) => {
    setClubs(next);
    saveClubs(next);
  }, []);

  const getClub = useCallback(
    (id: string) => clubs.find((c) => c.id === id),
    [clubs],
  );

  const createClub = useCallback(
    (data: ClubFormData): Club => {
      const now = new Date().toISOString();
      const club: Club = {
        ...data,
        id: generateId(),
        posts: data.posts ?? [],
        createdAt: now,
        updatedAt: now,
      };
      persist([club, ...clubs]);
      return club;
    },
    [clubs, persist],
  );

  const updateClub = useCallback(
    (id: string, data: ClubFormData): Club | undefined => {
      const index = clubs.findIndex((c) => c.id === id);
      if (index === -1) return undefined;

      const existing = clubs[index];
      const updated: Club = {
        ...existing,
        ...data,
        id: existing.id,
        posts: data.posts ?? existing.posts,
        createdAt: existing.createdAt,
        updatedAt: new Date().toISOString(),
      };

      const next = [...clubs];
      next[index] = updated;
      persist(next);
      return updated;
    },
    [clubs, persist],
  );

  const addPost = useCallback(
    (clubId: string, post: Omit<Post, 'id' | 'createdAt'>) => {
      const index = clubs.findIndex((c) => c.id === clubId);
      if (index === -1) return;

      const newPost: Post = {
        ...post,
        id: generatePostId(),
        createdAt: new Date().toISOString(),
      };

      const existing = clubs[index];
      const updated: Club = {
        ...existing,
        posts: [newPost, ...existing.posts],
        updatedAt: new Date().toISOString(),
      };

      const next = [...clubs];
      next[index] = updated;
      persist(next);
    },
    [clubs, persist],
  );

  const resetClubs = useCallback(() => {
    persist(SEED_CLUBS);
  }, [persist]);

  const value = useMemo(
    () => ({ clubs, getClub, createClub, updateClub, addPost, resetClubs }),
    [clubs, getClub, createClub, updateClub, addPost, resetClubs],
  );

  return <ClubsContext.Provider value={value}>{children}</ClubsContext.Provider>;
}

export function useClubs() {
  const ctx = useContext(ClubsContext);
  if (!ctx) throw new Error('useClubs must be used within ClubsProvider');
  return ctx;
}

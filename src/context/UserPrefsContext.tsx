import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { ClubCategory, GradeLevel } from '../types/club';

const PREFS_KEY = 'cluboard_user_prefs';

interface UserPrefs {
  onboardingComplete: boolean;
  grade: GradeLevel | '';
  interests: ClubCategory[];
  savedClubIds: string[];
}

const DEFAULT_PREFS: UserPrefs = {
  onboardingComplete: false,
  grade: '',
  interests: [],
  savedClubIds: [],
};

function loadPrefs(): UserPrefs {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) return DEFAULT_PREFS;
    return { ...DEFAULT_PREFS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_PREFS;
  }
}

function savePrefs(prefs: UserPrefs): void {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

interface UserPrefsContextValue {
  prefs: UserPrefs;
  completeOnboarding: (grade: GradeLevel | '', interests: ClubCategory[]) => void;
  setGrade: (grade: GradeLevel | '') => void;
  toggleSavedClub: (clubId: string) => void;
  isClubSaved: (clubId: string) => boolean;
  skipOnboarding: () => void;
  resetOnboarding: () => void;
}

const UserPrefsContext = createContext<UserPrefsContextValue | null>(null);

export function UserPrefsProvider({ children }: { children: ReactNode }) {
  const [prefs, setPrefs] = useState<UserPrefs>(loadPrefs);

  const persist = useCallback((next: UserPrefs) => {
    setPrefs(next);
    savePrefs(next);
  }, []);

  const completeOnboarding = useCallback(
    (grade: GradeLevel | '', interests: ClubCategory[]) => {
      persist({
        ...prefs,
        onboardingComplete: true,
        grade,
        interests,
      });
    },
    [prefs, persist],
  );

  const skipOnboarding = useCallback(() => {
    persist({ ...prefs, onboardingComplete: true });
  }, [prefs, persist]);

  const resetOnboarding = useCallback(() => {
    persist({ ...prefs, onboardingComplete: false });
  }, [prefs, persist]);

  const setGrade = useCallback(
    (grade: GradeLevel | '') => {
      persist({ ...prefs, grade });
    },
    [prefs, persist],
  );

  const toggleSavedClub = useCallback(
    (clubId: string) => {
      const saved = prefs.savedClubIds.includes(clubId)
        ? prefs.savedClubIds.filter((id) => id !== clubId)
        : [...prefs.savedClubIds, clubId];
      persist({ ...prefs, savedClubIds: saved });
    },
    [prefs, persist],
  );

  const isClubSaved = useCallback(
    (clubId: string) => prefs.savedClubIds.includes(clubId),
    [prefs.savedClubIds],
  );

  const value = useMemo(
    () => ({
      prefs,
      completeOnboarding,
      setGrade,
      toggleSavedClub,
      isClubSaved,
      skipOnboarding,
      resetOnboarding,
    }),
    [prefs, completeOnboarding, setGrade, toggleSavedClub, isClubSaved, skipOnboarding, resetOnboarding],
  );

  return (
    <UserPrefsContext.Provider value={value}>{children}</UserPrefsContext.Provider>
  );
}

export function useUserPrefs() {
  const ctx = useContext(UserPrefsContext);
  if (!ctx) throw new Error('useUserPrefs must be used within UserPrefsProvider');
  return ctx;
}

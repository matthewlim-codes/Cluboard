export interface Officer {
  name: string;
  role: string;
  email?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
}

export interface Club {
  id: string;
  name: string;
  description: string;
  logo?: string;
  meetingTime: string;
  meetingLocation: string;
  officers: Officer[];
  tags: string[];
  posts: Post[];
  featured: boolean;
  category: ClubCategory;
  meetingDays: DayOfWeek[];
  gradeLevels: GradeLevel[];
  contactEmail?: string;
  createdAt: string;
  updatedAt: string;
}

export type ClubCategory =
  | 'academic'
  | 'service'
  | 'leadership'
  | 'arts'
  | 'sports'
  | 'stem'
  | 'other';

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday';

export type GradeLevel = '9' | '10' | '11' | '12';

export type SortOption = 'newest' | 'most-active' | 'featured';

export const CATEGORY_LABELS: Record<ClubCategory, string> = {
  academic: 'Academic',
  service: 'Service',
  leadership: 'Leadership',
  arts: 'Arts',
  sports: 'Sports',
  stem: 'STEM',
  other: 'Other',
};

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
};

export const GRADE_LABELS: Record<GradeLevel, string> = {
  '9': '9th Grade',
  '10': '10th Grade',
  '11': '11th Grade',
  '12': '12th Grade',
};

export type ClubFormData = Omit<Club, 'id' | 'createdAt' | 'updatedAt' | 'posts'> & {
  posts?: Post[];
};

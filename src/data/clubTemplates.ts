import type { ClubFormData } from '../types/club';

export interface ClubTemplate {
  id: string;
  name: string;
  description: string;
  data: ClubFormData;
}

export const CLUB_TEMPLATES: ClubTemplate[] = [
  {
    id: 'nhs-template',
    name: 'National Honor Society',
    description: 'Scholarship, service, leadership, and character',
    data: {
      name: 'National Honor Society',
      tagline: 'Honor society — tutoring, service, leadership',
      description:
        'Recognizing outstanding high school students who demonstrate scholarship, service, leadership, and character.',
      meetingTime: 'Wednesdays, 3:15 PM',
      meetingLocation: 'Room ___ — ',
      officers: [
        { name: '', role: 'President', email: '' },
        { name: '', role: 'Vice President', email: '' },
      ],
      tags: ['scholarship', 'service', 'leadership', 'character'],
      featured: false,
      category: 'academic',
      meetingDays: ['wednesday'],
      gradeLevels: ['10', '11', '12'],
      howToJoin: 'Apply in the fall — GPA and teacher recommendations required',
      openToBeginners: false,
      contactEmail: '',
    },
  },
  {
    id: 'interact-template',
    name: 'Interact',
    description: 'Youth leadership and community service',
    data: {
      name: 'Interact',
      tagline: 'Plan service projects with Rotary',
      description:
        'A youth leadership club partnered with Rotary International. Members plan service projects and develop leadership skills.',
      meetingTime: 'Tuesdays, 2:45 PM',
      meetingLocation: 'Room ___ — ',
      officers: [{ name: '', role: 'President', email: '' }],
      tags: ['leadership', 'service', 'beginner-friendly'],
      featured: false,
      category: 'service',
      meetingDays: ['tuesday'],
      gradeLevels: ['9', '10', '11', '12'],
      howToJoin: 'Show up to the next meeting — all grade levels welcome',
      openToBeginners: true,
      contactEmail: '',
    },
  },
  {
    id: 'blank',
    name: 'Start from scratch',
    description: 'Empty form for any club type',
    data: {
      name: '',
      tagline: '',
      description: '',
      meetingTime: '',
      meetingLocation: '',
      officers: [{ name: '', role: 'President', email: '' }],
      tags: [],
      featured: false,
      category: 'other',
      meetingDays: [],
      gradeLevels: ['9', '10', '11', '12'],
      howToJoin: 'Show up to the next meeting',
      openToBeginners: true,
      contactEmail: '',
    },
  },
];

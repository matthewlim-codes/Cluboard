import type { Club } from '../types/club';

const now = new Date();
const daysAgo = (n: number) =>
  new Date(now.getTime() - n * 24 * 60 * 60 * 1000).toISOString();

export const SEED_CLUBS: Club[] = [
  {
    id: 'nhs',
    name: 'National Honor Society',
    tagline: 'Honor society — tutoring, service, leadership',
    description:
      'Recognizing outstanding high school students who demonstrate scholarship, service, leadership, and character. NHS members lead tutoring programs, community service projects, and school-wide initiatives that make a real difference.',
    logo: undefined,
    meetingTime: 'Wednesdays, 3:15 PM',
    meetingLocation: 'Room 204 — Media Center',
    officers: [
      { name: 'Sarah Chen', role: 'President', email: 'schen@school.edu' },
      { name: 'Marcus Williams', role: 'Vice President', email: 'mwilliams@school.edu' },
      { name: 'Priya Patel', role: 'Secretary', email: 'ppatel@school.edu' },
      { name: 'James Okafor', role: 'Treasurer', email: 'jokafor@school.edu' },
    ],
    tags: ['scholarship', 'service', 'leadership', 'character', 'honors'],
    category: 'academic',
    meetingDays: ['wednesday'],
    gradeLevels: ['10', '11', '12'],
    howToJoin: 'Apply in the fall — GPA and teacher recommendations required',
    openToBeginners: false,
    contactEmail: 'nhs@school.edu',
    featured: true,
    posts: [
      {
        id: 'nhs-p1',
        title: 'Spring Tutoring Sign-Up Open',
        content:
          'We need peer tutors for math, science, and English. Earn service hours while helping classmates succeed. Sign up at our next meeting!',
        createdAt: daysAgo(1),
      },
      {
        id: 'nhs-p2',
        title: 'Food Drive Results',
        content:
          'Amazing work everyone! We collected 847 items for the local food pantry — our best drive yet. Thank you to every member who volunteered.',
        createdAt: daysAgo(4),
      },
      {
        id: 'nhs-p3',
        title: 'Induction Ceremony — March 15',
        content:
          'Congratulations to our 42 new inductees! Families are welcome. Ceremony starts at 6:30 PM in the auditorium. Dress code: business casual.',
        createdAt: daysAgo(8),
      },
    ],
    createdAt: daysAgo(120),
    updatedAt: daysAgo(1),
  },
  {
    id: 'interact',
    name: 'Interact',
    tagline: 'Plan service projects with Rotary',
    description:
      'A youth leadership club partnered with Rotary International. Interact members plan service projects, develop leadership skills, and make a positive impact in our school and community through hands-on action.',
    logo: undefined,
    meetingTime: 'Tuesdays, 2:45 PM',
    meetingLocation: 'Room 112 — Student Commons',
    officers: [
      { name: 'Elena Rodriguez', role: 'President', email: 'erodriguez@school.edu' },
      { name: 'Tyler Kim', role: 'Vice President', email: 'tkim@school.edu' },
      { name: 'Aisha Johnson', role: 'Service Chair', email: 'ajohnson@school.edu' },
    ],
    tags: ['leadership', 'service', 'rotary', 'community', 'youth', 'beginner-friendly'],
    category: 'service',
    meetingDays: ['tuesday'],
    gradeLevels: ['9', '10', '11', '12'],
    howToJoin: 'Show up to any Tuesday meeting — all grade levels welcome',
    openToBeginners: true,
    contactEmail: 'interact@school.edu',
    featured: true,
    posts: [
      {
        id: 'interact-p1',
        title: 'Park Cleanup This Saturday',
        content:
          'Join us at Riverside Park, 9 AM–12 PM. Gloves and bags provided. Bring a friend — no experience needed. Community service hours available!',
        createdAt: daysAgo(2),
      },
      {
        id: 'interact-p2',
        title: 'New Member Welcome',
        content:
          'We welcomed 18 new members at our last meeting! If you missed it, stop by any Tuesday. All grade levels welcome — just bring your energy and ideas.',
        createdAt: daysAgo(5),
      },
      {
        id: 'interact-p3',
        title: 'Fundraiser Planning Session',
        content:
          'Next meeting we will brainstorm ideas for our spring fundraiser benefiting the local children\'s hospital. Come with one idea to share!',
        createdAt: daysAgo(10),
      },
    ],
    createdAt: daysAgo(90),
    updatedAt: daysAgo(2),
  },
];

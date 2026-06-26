import type { Club } from '../types/club';

function parseMeetingHour(time: string): { hour: number; minute: number } {
  const match = time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  if (!match) return { hour: 15, minute: 15 };
  let hour = parseInt(match[1], 10);
  const minute = parseInt(match[2], 10);
  const ampm = match[3]?.toUpperCase();
  if (ampm === 'PM' && hour < 12) hour += 12;
  if (ampm === 'AM' && hour === 12) hour = 0;
  return { hour, minute };
}

function nextMeetingDate(meetingDays: string[]): Date {
  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };
  const targetDays = meetingDays.map((d) => dayMap[d]).filter((d) => d !== undefined);
  const now = new Date();
  if (targetDays.length === 0) {
    const fallback = new Date(now);
    fallback.setDate(fallback.getDate() + 7);
    return fallback;
  }
  for (let i = 0; i < 14; i++) {
    const candidate = new Date(now);
    candidate.setDate(candidate.getDate() + i);
    if (targetDays.includes(candidate.getDay())) return candidate;
  }
  return now;
}

function formatIcsDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function buildGoogleCalendarUrl(club: Club): string {
  const start = nextMeetingDate(club.meetingDays);
  const { hour, minute } = parseMeetingHour(club.meetingTime);
  start.setHours(hour, minute, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: `${club.name} Meeting`,
    dates: `${formatIcsDate(start)}/${formatIcsDate(end)}`,
    details: club.tagline || club.description.slice(0, 200),
    location: club.meetingLocation,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadIcsFile(club: Club): void {
  const start = nextMeetingDate(club.meetingDays);
  const { hour, minute } = parseMeetingHour(club.meetingTime);
  start.setHours(hour, minute, 0, 0);
  const end = new Date(start);
  end.setHours(end.getHours() + 1);

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `DTSTART:${formatIcsDate(start)}`,
    `DTEND:${formatIcsDate(end)}`,
    `SUMMARY:${club.name} Meeting`,
    `DESCRIPTION:${(club.tagline || '').replace(/\n/g, '\\n')}`,
    `LOCATION:${club.meetingLocation}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${club.name.replace(/\s+/g, '-')}-meeting.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Mail,
  MapPin,
  Pencil,
  Users,
} from 'lucide-react';
import { AppShell } from '../components/layout/AppShell';
import { ClubAvatar } from '../components/clubs/ClubAvatar';
import { PostCard } from '../components/feed/PostCard';
import { useClubs } from '../context/ClubsContext';
import type { Club } from '../types/club';
import { CATEGORY_LABELS, DAY_LABELS } from '../types/club';

type Tab = 'about' | 'schedule' | 'posts' | 'contact';

export function ClubProfilePage() {
  const { id } = useParams<{ id: string }>();
  const { getClub } = useClubs();
  const club = id ? getClub(id) : undefined;
  const [activeTab, setActiveTab] = useState<Tab>('about');

  if (!club) {
    return (
      <AppShell hideNav>
        <div className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
          <p className="text-lg font-semibold text-neutral-900">Club not found</p>
          <Link to="/" className="mt-4 text-sm font-medium text-pink-600">
            Back to directory
          </Link>
        </div>
      </AppShell>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'schedule', label: 'Schedule' },
    { id: 'posts', label: 'Posts' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <AppShell hideNav>
      <header className="sticky top-0 z-40 border-b border-neutral-100 bg-white/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            to="/"
            className="flex items-center gap-1 text-sm font-medium text-neutral-700"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <span className="truncate font-semibold text-neutral-900">{club.name}</span>
          <Link
            to={`/club/${club.id}/edit`}
            className="flex items-center gap-1 text-sm font-medium text-pink-600"
          >
            <Pencil className="h-4 w-4" />
            Edit
          </Link>
        </div>
      </header>

      <div className="px-4 pt-6">
        <div className="flex items-center gap-5">
          <ClubAvatar name={club.name} id={club.id} logo={club.logo} size="xl" />
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-bold text-neutral-900">{club.name}</h1>
            <p className="mt-0.5 text-sm text-neutral-500">
              {CATEGORY_LABELS[club.category]}
              {club.featured && (
                <span className="ml-2 text-pink-600">· Featured</span>
              )}
            </p>
            <div className="mt-3 flex gap-6 text-center">
              <Stat label="Posts" value={club.posts.length} />
              <Stat label="Officers" value={club.officers.length} />
              <Stat label="Tags" value={club.tags.length} />
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-neutral-700">{club.description}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {club.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-600"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <nav className="mt-5 flex border-b border-neutral-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-center text-xs font-semibold uppercase tracking-wide transition-colors ${
              activeTab === tab.id
                ? 'border-b-2 border-neutral-900 text-neutral-900'
                : 'text-neutral-400'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <div className="px-4 py-4 pb-8">
        {activeTab === 'about' && <AboutTab club={club} />}
        {activeTab === 'schedule' && <ScheduleTab club={club} />}
        {activeTab === 'posts' && <PostsTab club={club} />}
        {activeTab === 'contact' && <ContactTab club={club} />}
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <p className="text-lg font-bold text-neutral-900">{value}</p>
      <p className="text-xs text-neutral-500">{label}</p>
    </div>
  );
}

function AboutTab({ club }: { club: Club }) {
  return (
    <div className="space-y-4">
      <InfoRow icon={Clock} label="Meeting time" value={club.meetingTime} />
      <InfoRow icon={MapPin} label="Location" value={club.meetingLocation} />
      <InfoRow
        icon={Users}
        label="Grade levels"
        value={club.gradeLevels.map((g) => `${g}th`).join(', ')}
      />
      <div>
        <h3 className="mb-2 text-sm font-semibold text-neutral-900">Officers</h3>
        <div className="space-y-2">
          {club.officers.map((officer) => (
            <div
              key={officer.name + officer.role}
              className="flex items-center justify-between rounded-xl bg-neutral-50 px-3 py-2.5"
            >
              <div>
                <p className="text-sm font-medium text-neutral-900">{officer.name}</p>
                <p className="text-xs text-neutral-500">{officer.role}</p>
              </div>
              {officer.email && (
                <a
                  href={`mailto:${officer.email}`}
                  className="text-xs text-pink-600"
                >
                  Email
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ScheduleTab({ club }: { club: Club }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-neutral-200 p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900">
          <Calendar className="h-4 w-4 text-pink-500" />
          Regular meetings
        </div>
        <p className="mt-2 text-sm text-neutral-700">{club.meetingTime}</p>
        <p className="mt-1 text-sm text-neutral-500">
          {club.meetingDays.map((d) => DAY_LABELS[d]).join(', ')}
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-sm text-neutral-600">
          <MapPin className="h-3.5 w-3.5 text-neutral-400" />
          {club.meetingLocation}
        </p>
      </div>
      <p className="text-xs text-neutral-400">
        Check the Posts tab for event announcements and schedule changes.
      </p>
    </div>
  );
}

function PostsTab({ club }: { club: Club }) {
  if (club.posts.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-neutral-500">No posts yet</p>
    );
  }

  return (
    <div className="space-y-3">
      {club.posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          clubId={club.id}
          clubName={club.name}
          clubLogo={club.logo}
          showClubHeader={false}
        />
      ))}
    </div>
  );
}

function ContactTab({ club }: { club: Club }) {
  return (
    <div className="space-y-4">
      {club.contactEmail && (
        <a
          href={`mailto:${club.contactEmail}`}
          className="flex items-center gap-3 rounded-2xl border border-neutral-200 p-4 transition-colors hover:bg-neutral-50"
        >
          <Mail className="h-5 w-5 text-pink-500" />
          <div>
            <p className="text-sm font-medium text-neutral-900">Club email</p>
            <p className="text-sm text-pink-600">{club.contactEmail}</p>
          </div>
        </a>
      )}
      <div>
        <h3 className="mb-2 text-sm font-semibold text-neutral-900">Officer contacts</h3>
        <div className="space-y-2">
          {club.officers.map((officer) => (
            <div
              key={officer.name + officer.role}
              className="rounded-xl border border-neutral-200 px-3 py-2.5"
            >
              <p className="text-sm font-medium text-neutral-900">
                {officer.name} — {officer.role}
              </p>
              {officer.email && (
                <a
                  href={`mailto:${officer.email}`}
                  className="text-xs text-pink-600"
                >
                  {officer.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-neutral-400" />
      <div>
        <p className="text-xs font-medium text-neutral-500">{label}</p>
        <p className="text-sm text-neutral-800">{value}</p>
      </div>
    </div>
  );
}

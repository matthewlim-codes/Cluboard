import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppShell, PageHeader } from '../components/layout/AppShell';
import { ClubForm } from '../components/clubs/ClubForm';
import { CLUB_TEMPLATES } from '../data/clubTemplates';
import { useClubs } from '../context/ClubsContext';
import type { ClubFormData } from '../types/club';

export function CreateClubPage() {
  const { createClub } = useClubs();
  const navigate = useNavigate();
  const [templateId, setTemplateId] = useState('blank');
  const template = CLUB_TEMPLATES.find((t) => t.id === templateId) ?? CLUB_TEMPLATES[2];

  const handleSubmit = (data: ClubFormData) => {
    const club = createClub(data);
    navigate(`/club/${club.id}`);
  };

  return (
    <AppShell>
      <PageHeader
        title="Add Club"
        subtitle="Put a new club in the Cluboard"
      />
      <div className="px-4 py-4">
        <section className="mb-5">
          <p className="mb-2 text-sm font-medium text-neutral-700">Start from a template</p>
          <div className="grid gap-2">
            {CLUB_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTemplateId(t.id)}
                className={`rounded-xl border p-3 text-left transition-colors ${
                  templateId === t.id
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <p className="text-sm font-semibold text-neutral-900">{t.name}</p>
                <p className="text-xs text-neutral-500">{t.description}</p>
              </button>
            ))}
          </div>
        </section>
        <ClubForm
          key={templateId}
          templateData={template.data}
          onSubmit={handleSubmit}
          submitLabel="Add to Cluboard"
        />
      </div>
    </AppShell>
  );
}

export function EditClubPage() {
  const { id } = useParams<{ id: string }>();
  const { getClub, updateClub } = useClubs();
  const navigate = useNavigate();
  const club = id ? getClub(id) : undefined;

  if (!club) {
    return (
      <AppShell>
        <PageHeader title="Club not found" />
      </AppShell>
    );
  }

  const handleSubmit = (data: ClubFormData) => {
    updateClub(club.id, { ...data, posts: club.posts });
    navigate(`/club/${club.id}`);
  };

  return (
    <AppShell>
      <PageHeader title="Edit Club" subtitle={club.name} />
      <div className="px-4 py-4">
        <ClubForm
          initial={club}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
        />
      </div>
    </AppShell>
  );
}

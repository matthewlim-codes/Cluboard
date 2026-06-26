import { useNavigate, useParams } from 'react-router-dom';
import { AppShell, PageHeader } from '../components/layout/AppShell';
import { ClubForm } from '../components/clubs/ClubForm';
import { useClubs } from '../context/ClubsContext';
import type { ClubFormData } from '../types/club';

export function CreateClubPage() {
  const { createClub } = useClubs();
  const navigate = useNavigate();

  const handleSubmit = (data: ClubFormData) => {
    const club = createClub(data);
    navigate(`/club/${club.id}`);
  };

  return (
    <AppShell>
      <PageHeader
        title="Create Club"
        subtitle="Add a new club to the Cluboard"
      />
      <div className="px-4 py-4">
        <ClubForm onSubmit={handleSubmit} submitLabel="Create Club" />
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

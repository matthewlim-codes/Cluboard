import { useState, type FormEvent } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type {
  Club,
  ClubCategory,
  ClubFormData,
  DayOfWeek,
  GradeLevel,
  Officer,
} from '../../types/club';
import {
  CATEGORY_LABELS,
  DAY_LABELS,
  GRADE_LABELS,
} from '../../types/club';

interface ClubFormProps {
  initial?: Club;
  templateData?: ClubFormData;
  onSubmit: (data: ClubFormData) => void;
  submitLabel: string;
}

const EMPTY_OFFICER: Officer = { name: '', role: '', email: '' };

const defaultForm: ClubFormData = {
  name: '',
  tagline: '',
  description: '',
  logo: '',
  meetingTime: '',
  meetingLocation: '',
  officers: [{ ...EMPTY_OFFICER }],
  tags: [],
  featured: false,
  category: 'other',
  meetingDays: [],
  gradeLevels: ['9', '10', '11', '12'],
  howToJoin: 'Show up to the next meeting',
  openToBeginners: true,
  contactEmail: '',
};

export function ClubForm({ initial, templateData, onSubmit, submitLabel }: ClubFormProps) {
  const [form, setForm] = useState<ClubFormData>(
    initial
      ? {
          name: initial.name,
          tagline: initial.tagline,
          description: initial.description,
          logo: initial.logo ?? '',
          meetingTime: initial.meetingTime,
          meetingLocation: initial.meetingLocation,
          officers: initial.officers.length ? initial.officers : [{ ...EMPTY_OFFICER }],
          tags: initial.tags,
          featured: initial.featured,
          category: initial.category,
          meetingDays: initial.meetingDays,
          gradeLevels: initial.gradeLevels,
          howToJoin: initial.howToJoin,
          openToBeginners: initial.openToBeginners,
          contactEmail: initial.contactEmail ?? '',
        }
      : templateData ?? defaultForm,
  );
  const [tagsInput, setTagsInput] = useState(initial?.tags.join(', ') ?? '');

  const update = <K extends keyof ClubFormData>(key: K, value: ClubFormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);

    onSubmit({
      ...form,
      tags,
      officers: form.officers.filter((o) => o.name.trim()),
      logo: form.logo?.trim() || undefined,
      contactEmail: form.contactEmail?.trim() || undefined,
    });
  };

  const toggleDay = (day: DayOfWeek) => {
    const days = form.meetingDays.includes(day)
      ? form.meetingDays.filter((d) => d !== day)
      : [...form.meetingDays, day];
    update('meetingDays', days);
  };

  const toggleGrade = (grade: GradeLevel) => {
    const grades = form.gradeLevels.includes(grade)
      ? form.gradeLevels.filter((g) => g !== grade)
      : [...form.gradeLevels, grade];
    update('gradeLevels', grades);
  };

  const updateOfficer = (index: number, patch: Partial<Officer>) => {
    const officers = [...form.officers];
    officers[index] = { ...officers[index], ...patch };
    update('officers', officers);
  };

  const addOfficer = () => update('officers', [...form.officers, { ...EMPTY_OFFICER }]);

  const removeOfficer = (index: number) => {
    if (form.officers.length <= 1) return;
    update('officers', form.officers.filter((_, i) => i !== index));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Club name" required>
        <input
          type="text"
          required
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          placeholder="e.g. National Honor Society"
          className={inputClass}
        />
      </Field>

      <Field label="One-liner" required>
        <input
          type="text"
          required
          maxLength={80}
          value={form.tagline}
          onChange={(e) => update('tagline', e.target.value)}
          placeholder="Short summary for club cards (max 80 chars)"
          className={inputClass}
        />
      </Field>

      <Field label="Description" required>
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          placeholder="What does this club do?"
          className={inputClass}
        />
      </Field>

      <Field label="Logo image URL">
        <input
          type="url"
          value={form.logo}
          onChange={(e) => update('logo', e.target.value)}
          placeholder="https://..."
          className={inputClass}
        />
      </Field>

      <Field label="Category" required>
        <select
          value={form.category}
          onChange={(e) => update('category', e.target.value as ClubCategory)}
          className={inputClass}
        >
          {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Meeting time" required>
        <input
          type="text"
          required
          value={form.meetingTime}
          onChange={(e) => update('meetingTime', e.target.value)}
          placeholder="e.g. Wednesdays, 3:15 PM"
          className={inputClass}
        />
      </Field>

      <Field label="Meeting location" required>
        <input
          type="text"
          required
          value={form.meetingLocation}
          onChange={(e) => update('meetingLocation', e.target.value)}
          placeholder="e.g. Room 204 — Media Center"
          className={inputClass}
        />
      </Field>

      <Field label="Meeting days">
        <div className="flex flex-wrap gap-2">
          {(Object.entries(DAY_LABELS) as [DayOfWeek, string][]).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleDay(value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                form.meetingDays.includes(value)
                  ? 'border-pink-500 bg-pink-500 text-white'
                  : 'border-neutral-200 text-neutral-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Grade levels">
        <div className="flex flex-wrap gap-2">
          {(Object.entries(GRADE_LABELS) as [GradeLevel, string][]).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => toggleGrade(value)}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium ${
                form.gradeLevels.includes(value)
                  ? 'border-pink-500 bg-pink-500 text-white'
                  : 'border-neutral-200 text-neutral-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Tags (comma-separated)">
        <input
          type="text"
          value={tagsInput}
          onChange={(e) => setTagsInput(e.target.value)}
          placeholder="leadership, service, honors"
          className={inputClass}
        />
      </Field>

      <Field label="How to join" required>
        <input
          type="text"
          required
          value={form.howToJoin}
          onChange={(e) => update('howToJoin', e.target.value)}
          placeholder="e.g. Show up to the next meeting"
          className={inputClass}
        />
      </Field>

      <Field label="Contact email">
        <input
          type="email"
          value={form.contactEmail}
          onChange={(e) => update('contactEmail', e.target.value)}
          placeholder="club@school.edu"
          className={inputClass}
        />
      </Field>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <label className="text-sm font-medium text-neutral-700">Officers</label>
          <button
            type="button"
            onClick={addOfficer}
            className="flex items-center gap-1 text-xs font-medium text-pink-600"
          >
            <Plus className="h-3.5 w-3.5" />
            Add officer
          </button>
        </div>
        <div className="space-y-3">
          {form.officers.map((officer, i) => (
            <div key={i} className="rounded-xl border border-neutral-200 p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={officer.name}
                  onChange={(e) => updateOfficer(i, { name: e.target.value })}
                  placeholder="Name"
                  className={`${inputClass} flex-1`}
                />
                {form.officers.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeOfficer(i)}
                    className="shrink-0 rounded-lg p-2 text-neutral-400 hover:bg-neutral-100 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>
              <input
                type="text"
                value={officer.role}
                onChange={(e) => updateOfficer(i, { role: e.target.value })}
                placeholder="Role (e.g. President)"
                className={`${inputClass} mt-2`}
              />
              <input
                type="email"
                value={officer.email ?? ''}
                onChange={(e) => updateOfficer(i, { email: e.target.value })}
                placeholder="Email (optional)"
                className={`${inputClass} mt-2`}
              />
            </div>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3">
        <input
          type="checkbox"
          checked={form.openToBeginners}
          onChange={(e) => update('openToBeginners', e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-pink-500 focus:ring-pink-400"
        />
        <div>
          <p className="text-sm font-medium text-neutral-900">Open to beginners</p>
          <p className="text-xs text-neutral-500">No experience needed — good for new students</p>
        </div>
      </label>

      <label className="flex items-center gap-3 rounded-xl border border-neutral-200 p-3">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => update('featured', e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-pink-500 focus:ring-pink-400"
        />
        <div>
          <p className="text-sm font-medium text-neutral-900">On the shelf (featured)</p>
          <p className="text-xs text-neutral-500">Show in the featured row on Home</p>
        </div>
      </label>

      <button
        type="submit"
        className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 py-3.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.99]"
      >
        {submitLabel}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-700">
        {label}
        {required && <span className="text-pink-500"> *</span>}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  'w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-pink-400 focus:bg-white focus:ring-2 focus:ring-pink-100';

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import {
  CATEGORY_LABELS,
  type ClubCategory,
  type GradeLevel,
} from '../types/club';
import { useUserPrefs } from '../context/UserPrefsContext';

const GRADES: { value: GradeLevel | ''; label: string }[] = [
  { value: '9', label: '9th' },
  { value: '10', label: '10th' },
  { value: '11', label: '11th' },
  { value: '12', label: '12th' },
];

const INTERESTS = Object.entries(CATEGORY_LABELS) as [ClubCategory, string][];

export function OnboardingModal() {
  const { prefs, completeOnboarding, skipOnboarding } = useUserPrefs();
  const [step, setStep] = useState(0);
  const [grade, setGrade] = useState<GradeLevel | ''>('');
  const [interests, setInterests] = useState<ClubCategory[]>([]);

  if (prefs.onboardingComplete) return null;

  const toggleInterest = (cat: ClubCategory) => {
    setInterests((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  };

  const finish = () => completeOnboarding(grade, interests);

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-pink-600">
              Welcome to Cluboard
            </p>
            <h2 className="mt-1 text-xl font-bold text-neutral-900">
              {step === 0 ? 'What grade are you in?' : 'What are you into?'}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {step === 0
                ? 'We\'ll highlight clubs open to you.'
                : 'Pick a few interests — you can change this anytime.'}
            </p>
          </div>
          <button
            type="button"
            onClick={skipOnboarding}
            className="rounded-lg p-1 text-neutral-400 hover:bg-neutral-100"
            aria-label="Skip"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {step === 0 ? (
          <div className="mt-5 grid grid-cols-2 gap-2">
            {GRADES.map((g) => (
              <button
                key={g.value}
                type="button"
                onClick={() => setGrade(g.value)}
                className={`rounded-2xl border py-4 text-sm font-semibold transition-colors ${
                  grade === g.value
                    ? 'border-pink-500 bg-pink-50 text-pink-700'
                    : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                }`}
              >
                {g.label} grade
              </button>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-2">
            {INTERESTS.map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() => toggleInterest(value)}
                className={`rounded-full border px-4 py-2.5 text-xs font-semibold transition-colors ${
                  interests.includes(value)
                    ? 'border-pink-500 bg-pink-500 text-white'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-6 flex gap-2">
          {step === 1 && (
            <button
              type="button"
              onClick={() => setStep(0)}
              className="flex-1 rounded-xl border border-neutral-200 py-3 text-sm font-semibold text-neutral-700"
            >
              Back
            </button>
          )}
          {step === 0 ? (
            <button
              type="button"
              onClick={() => setStep(1)}
              disabled={!grade}
              className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 py-3 text-sm font-semibold text-white disabled:opacity-40"
            >
              Next
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 py-3 text-sm font-semibold text-white"
            >
              Open the Cluboard
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={skipOnboarding}
          className="mt-3 w-full text-center text-xs text-neutral-400 hover:text-neutral-600"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}

export function MissingClubCta() {
  return (
    <Link
      to="/create"
      className="mx-4 mb-4 flex items-center justify-between rounded-2xl border border-dashed border-pink-300 bg-pink-50 px-4 py-4 transition-colors hover:bg-pink-100"
    >
      <div>
        <p className="text-sm font-semibold text-pink-800">Missing your club?</p>
        <p className="text-xs text-pink-600">Add it to the Cluboard in 2 minutes</p>
      </div>
      <ArrowRight className="h-5 w-5 text-pink-500" />
    </Link>
  );
}

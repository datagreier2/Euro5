import { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useI18n } from '../i18n';

const CHANGELOG_CSV_URL = `${import.meta.env.BASE_URL}data/changelog.csv`;

type ChangelogRow = {
  'Latest commits': string;
  'Known issues': string;
};

type Entry = {
  commit: string;
  issue: string;
};

export default function DevPage() {
  const { t } = useI18n();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(CHANGELOG_CSV_URL, { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const text = await res.text();
        if (!text.trim()) {
          if (active) setEntries([]);
          return;
        }
        const parsed = Papa.parse<ChangelogRow>(text, {
          header: true,
          skipEmptyLines: 'greedy',
          transformHeader: h => h.trim(),
          transform: v => (typeof v === 'string' ? v.trim() : v),
        });
        if (parsed.errors.length) {
          throw new Error(parsed.errors[0]?.message ?? 'Parse error');
        }
        const rows = (parsed.data ?? []).filter(row => row['Latest commits'] || row['Known issues']);
        const mapped: Entry[] = rows.map(row => ({
          commit: row['Latest commits'] ?? '',
          issue: row['Known issues'] ?? '',
        })).reverse();
        if (active) setEntries(mapped);
      } catch (err) {
        if (!active) return;
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <h2 className="text-4xl font-serif text-neutral-900 tracking-wide mb-4">
          {t('devPage.title')}
        </h2>
        <p className="text-neutral-600 font-light leading-relaxed">
          {t('devPage.subtitle')}
        </p>
      </header>

      {loading && (
        <div className="p-6 text-neutral-600">{t('devPage.loading')}</div>
      )}

      {error && !loading && (
        <div className="m-6 p-4 bg-red-50 border border-red-200 text-red-700">
          <strong>{t('devPage.errorTitle')}</strong>
          <div className="mt-2 text-sm">{error}</div>
        </div>
      )}

      {!loading && !error && (
        <section className="grid gap-6 md:grid-cols-2">
          <article className="bg-white border border-neutral-200 p-6">
            <h3 className="text-2xl font-serif font-semibold text-neutral-900 mb-4 tracking-wide">
              {t('devPage.commitsHeading')}
            </h3>
            <ul className="space-y-4">
              {entries.length === 0 && (
                <li className="text-neutral-500 font-light">{t('devPage.emptyState')}</li>
              )}
              {entries.map((entry, idx) => (
                <li key={`commit-${idx}`} className="text-neutral-600 font-light leading-relaxed">
                  {entry.commit || t('devPage.noEntry')}
                </li>
              ))}
            </ul>
          </article>

          <article className="bg-white border border-neutral-200 p-6">
            <h3 className="text-2xl font-serif font-semibold text-neutral-900 mb-4 tracking-wide">
              {t('devPage.issuesHeading')}
            </h3>
            <ul className="space-y-4">
              {entries.length === 0 && (
                <li className="text-neutral-500 font-light">{t('devPage.emptyState')}</li>
              )}
              {entries.map((entry, idx) => (
                <li key={`issue-${idx}`} className="text-neutral-600 font-light leading-relaxed">
                  {entry.issue || t('devPage.noEntry')}
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </main>
  );
}

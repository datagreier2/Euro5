import { useEffect, useState } from 'react';
import Papa from 'papaparse';

const CHANGELOG_CSV_URL = `${import.meta.env.BASE_URL}data/changelog.csv`;

type ChangelogRow = {
  'Public title': string;
  'Public details': string;
  'Notes public': string;
  Status: string;
  Realm: string;
};

type Entry = {
  title: string;
  details: string;
  notes: string;
  status: string;
  realm: string;
};

const STRINGS = {
  title: 'Development changelog',
  subtitle: 'Internal notes on platform improvements and known issues.',
  loading: 'Loading changelog…',
  errorTitle: 'Could not load changelog',
  commitsHeading: 'Done',
  issuesHeading: 'Issues',
  emptyState: 'No entries recorded yet.',
  noEntry: '—',
};

export default function DevPage() {
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
        const rows = (parsed.data ?? []).filter(row => row['Public title'] || row['Public details']);
        const mapped: Entry[] = rows.map(row => ({
          title: row['Public title'] ?? '',
          details: row['Public details'] ?? '',
          notes: row['Notes public'] ?? '',
          status: row.Status ?? '',
          realm: row.Realm ?? '',
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
    <main>
      <section className="bg-neutral-950 border-b border-neutral-800">
      <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <h1 className="text-[40px] sm:text-[56px] lg:text-[72px] font-sans font-semibold tracking-[0.4em] text-neutral-100">
            DEV
          </h1>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <header className="mb-12">
          <h2 className="text-4xl font-serif text-neutral-100 tracking-wide mb-4">
            {STRINGS.title}
          </h2>
          <p className="text-neutral-400 font-light leading-relaxed">
            {STRINGS.subtitle}
          </p>
        </header>

        {loading && (
        <div className="p-6 text-neutral-400">{STRINGS.loading}</div>
        )}

        {error && !loading && (
          <div className="m-6 rounded-md border border-red-500/70 bg-red-900/30 p-4 text-red-200">
            <strong>{STRINGS.errorTitle}</strong>
            <div className="mt-2 text-sm">{error}</div>
          </div>
        )}

        {!loading && !error && (
          <Cards entries={entries} />
        )}
      </div>
    </main>
  );
}

interface CardsProps {
  entries: Entry[];
}

function Cards({ entries }: CardsProps) {
  const normalizeStatus = (status: string | undefined) => (status ?? '').trim().toUpperCase();
  const doneEntries = entries.filter(entry => normalizeStatus(entry.status).includes('DONE!'));
  const issueEntries = entries.filter(entry => !normalizeStatus(entry.status).includes('DONE!'));
  const PAGE_SIZE = 24;
  const [activeTab, setActiveTab] = useState<'done' | 'issues'>('done');
  const [doneVisible, setDoneVisible] = useState(PAGE_SIZE);
  const [issueVisible, setIssueVisible] = useState(PAGE_SIZE);

  useEffect(() => {
    setDoneVisible(PAGE_SIZE);
    setIssueVisible(PAGE_SIZE);
  }, [entries]);

  const renderList = (items: Entry[], visibleCount: number, onLoadMore: () => void) => {
    const visibleItems = items.slice(0, visibleCount);
    const hasMore = visibleCount < items.length;

    return (
      <div className="space-y-4">
        {visibleItems.length === 0 ? (
          <div className="text-neutral-500 font-light">{STRINGS.emptyState}</div>
        ) : (
          visibleItems.map((entry, idx) => (
            <article
              key={`${entry.title}-${idx}`}
              className="rounded-md border border-neutral-800 bg-neutral-900/90 p-6 text-left"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-lg font-semibold text-neutral-100 tracking-wide mb-2">
                  {entry.title || STRINGS.noEntry}
                </h4>
                {entry.realm && (
                  <span className="inline-flex h-6 items-center rounded-full border border-neutral-700 bg-neutral-900 px-3 text-[0.65rem] uppercase tracking-[0.2em] text-neutral-400">
                    {entry.realm}
                  </span>
                )}
              </div>
              {entry.details && (
                <p className="text-neutral-300 font-light leading-relaxed mb-3">
                  {entry.details}
                </p>
              )}
              {entry.notes && (
                <p className="text-neutral-400 italic leading-relaxed">
                  {entry.notes}
                </p>
              )}
            </article>
          ))
        )}
        {hasMore && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onLoadMore}
              className="w-full rounded-full border border-neutral-700 px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-300 transition hover:border-amber-400 hover:text-amber-300"
            >
              Load more
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          onClick={() => setActiveTab('done')}
          className={`flex-1 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
            activeTab === 'done'
              ? 'border-amber-400 bg-amber-400/10 text-amber-300'
              : 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500'
          }`}
        >
          {STRINGS.commitsHeading}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('issues')}
          className={`flex-1 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
            activeTab === 'issues'
              ? 'border-amber-400 bg-amber-400/10 text-amber-300'
              : 'border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-500'
          }`}
        >
          {STRINGS.issuesHeading}
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className={`${activeTab === 'done' ? 'block' : 'hidden'} md:block`}>
          <h3 className="text-2xl font-serif font-semibold text-neutral-100 mb-4 tracking-wide">
            {STRINGS.commitsHeading}
          </h3>
          {renderList(doneEntries, doneVisible, () => setDoneVisible(v => v + PAGE_SIZE))}
        </div>
        <div className={`${activeTab === 'issues' ? 'block' : 'hidden'} md:block`}>
          <h3 className="text-2xl font-serif font-semibold text-neutral-100 mb-4 tracking-wide">
            {STRINGS.issuesHeading}
          </h3>
          {renderList(issueEntries, issueVisible, () => setIssueVisible(v => v + PAGE_SIZE))}
        </div>
      </div>
    </section>
  );
}

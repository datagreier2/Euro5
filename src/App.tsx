


import { useCallback, useEffect, useMemo, useState } from 'react';
import type { MouseEvent } from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';
import logoMark from '../media/svg/Euro5_E5n_Logo_2.svg';

import { fetchCSV, fetchCSVWithSchema, CsvError } from './lib/fetchCsv';
import { the5RowSchema, type The5Row } from './validation-the5';
import { nordicPickRowSchema, type NordicPickRow } from './validation-nordic';
import type { WeeklyRow, NewsStory } from './types';

import StoriesGrid from './components/StoriesGrid';
import Pagination from './components/Pagination';

import The5Articles from './components/The5Articles';
import NordicPicks from './components/NordicPicks';
import AboutPage from './pages/About';
import DevPage from './pages/Dev';
import { Locale, useI18n } from './i18n';






/* ---------- helpers (outside component) ---------- */

const WEEKLY_CSV_URL = `${import.meta.env.BASE_URL}data/weekly.csv`;
const THE5_CSV_URL        = `${import.meta.env.BASE_URL}data/the_5.csv`;
const NORDIC_PICKS_CSV_URL = `${import.meta.env.BASE_URL}data/nordic_picks.csv`;

const PLACEHOLDER_IMG =
  'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800';

const getInitialRoute = () => (typeof window !== 'undefined' ? window.location.pathname || '/' : '/');

const CATEGORY_MASKS: Record<string, string> = {
  'utenriks uten usa': 'Utenriks',
  'næringsliv og nasjonaløkonomi': 'Økonomi',
  'mest debattert': 'Debattert',
};

function normalizeCategory(category?: string | null): string {
  if (!category) return '';
  const cleaned = category.trim();
  if (!cleaned) return '';
  const masked = CATEGORY_MASKS[cleaned.toLowerCase()];
  return masked ?? cleaned;
}

function toReadTime(summary?: string | null): number {
  if (!summary) return 4;
  const words = summary.trim().split(/\s+/).length;
  return Math.max(2, Math.round(words / 200)); // ~200 wpm
}

function parseDateISO(s?: string | null): string {
  if (!s) return new Date().toISOString();
  const d = new Date(s);
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString();
}

function transformRowsToStories(rows: WeeklyRow[]): NewsStory[] {
  const sorted = [...rows].sort((a, b) => {
    const da = new Date(a.published_iso ?? 0).getTime();
    const db = new Date(b.published_iso ?? 0).getTime();
    return db - da;
  });

  return sorted.map(r => {
  // Build a stable id from link or title+published_iso
  const stableId = r.link || `${r.title}-${r.published_iso ?? ''}`;
  return {
    id: stableId,
    title: r.title,
    excerpt: r.summary ?? '',
    source: r.source_name,            // <-- map source_name -> source (UI field)
    category: normalizeCategory(r.category),
    country: r.country ?? (typeof r.country_infer === 'string' ? r.country_infer : null),
    publishedAt: parseDateISO(r.published_iso),
    imageUrl: PLACEHOLDER_IMG,
    readTime: toReadTime(r.summary),
  };
});
}

function getISOWeekInfo(date: Date) {
  const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNumber = target.getUTCDay() || 7;
  target.setUTCDate(target.getUTCDate() + 4 - dayNumber);
  const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
  const week = Math.ceil(((target.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return { week, year: target.getUTCFullYear() };
}

function computeWeekNumber(lastModifiedHeader: string | null, rows: WeeklyRow[]): string {
  const candidates: Date[] = [];

  if (lastModifiedHeader) {
    const parsed = new Date(lastModifiedHeader);
    if (!Number.isNaN(parsed.getTime())) candidates.push(parsed);
  }

  const fallbackDate = rows.reduce<Date | null>((latest, row) => {
    if (!row.published_iso) return latest;
    const parsed = new Date(row.published_iso);
    if (Number.isNaN(parsed.getTime())) return latest;
    if (!latest || parsed.getTime() > latest.getTime()) return parsed;
    return latest;
  }, null);

  if (fallbackDate) candidates.push(fallbackDate);

  const validDate = candidates.find(d => !Number.isNaN(d.getTime()));
  if (!validDate) return '';

  const { week } = getISOWeekInfo(validDate);
  return String(week).padStart(2, '0');
}

/* ===================== COMPONENT ===================== */
function App() {
  const { t, locale, setLocale, availableLocales } = useI18n();

  const [route, setRoute] = useState<string>(() => getInitialRoute());
  useEffect(() => {
    const handlePop = () => {
      setRoute(getInitialRoute());
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigate = useCallback((path: string) => {
    if (typeof window === 'undefined') return;
    if (path === route) return;
    window.history.pushState(null, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const handleNav = useCallback((path: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(path);
  }, [navigate]);

  const isAboutRoute = route.startsWith('/about');
  const isDevRoute = route.startsWith('/dev');

  // data loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stories, setStories] = useState<NewsStory[]>([]);
  const [the5Rows, setThe5Rows] = useState<The5Row[] | null>(null);
  const [weekNumber, setWeekNumber] = useState('');
  const [nordicPicks, setNordicPicks] = useState<NordicPickRow[] | null>(null);



  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 12;

  const formatDate = useCallback((dateString: string) => {
    const localeForDate =
      locale === 'nb' ? 'nb-NO'
        : locale === 'nn' ? 'nn-NO'
        : locale === 'da' ? 'da-DK'
        : locale === 'sv' ? 'sv-SE'
        : 'en-GB';

    return new Date(dateString).toLocaleDateString(localeForDate, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }, [locale]);

  const weekBadgeLabel = weekNumber
    ? t('header.weekLabel', { week: weekNumber })
    : t('header.weekFallback');

  const errorMessage = error === '__unknown__' ? t('errors.unknownCsv') : error;
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const localeLabel = useCallback((code: Locale) => (
    `${code.slice(0, 1).toUpperCase()}${code.slice(1).toLowerCase()}`
  ), []);
  const navLinkClass = useCallback((active: boolean) => (
    `text-neutral-300 hover:text-amber-400 transition-colors font-light tracking-wide ${active ? 'text-amber-400' : ''}`
  ), []);

  const footer = (
    <footer className="bg-neutral-950 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <img src={logoMark} alt="Euro5" className="w-10 h-10 mr-3" />
              <div>
                <h3 className="text-2xl font-serif text-neutral-100 tracking-wide">{t('footer.brandTitle')}</h3>
                <p className="text-xs text-neutral-400 font-light tracking-widest uppercase">{t('footer.brandSubtitle')}</p>
              </div>
            </div>
            <p className="text-neutral-400 mb-6 font-light leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex space-x-6">
              <ExternalLink className="w-5 h-5 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer" />
              <BookOpen className="w-5 h-5 text-neutral-400 hover:text-amber-400 transition-colors cursor-pointer" />
            </div>
          </div>
          <div>
            <h4 className="font-serif text-neutral-200 mb-6 tracking-wide">{t('footer.navigationTitle')}</h4>
            <ul className="space-y-3 text-neutral-400 font-light">
              <li><a href="/" onClick={handleNav('/')} className="hover:text-amber-400 transition-colors tracking-wide">{t('navigation.thisWeek')}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">{t('navigation.archives')}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">{t('navigation.sources')}</a></li>
              <li><a href="/dev" onClick={handleNav('/dev')} className="hover:text-amber-400 transition-colors tracking-wide">{t('navigation.dev')}</a></li>
              <li><a href="/about" onClick={handleNav('/about')} className="hover:text-amber-400 transition-colors tracking-wide">{t('navigation.about')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-neutral-200 mb-6 tracking-wide">{t('footer.briefingsTitle')}</h4>
            <ul className="space-y-3 text-neutral-400 font-light">
              <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">{t('footer.briefings.technology')}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">{t('footer.briefings.business')}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">{t('footer.briefings.science')}</a></li>
              <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">{t('footer.briefings.health')}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-500">
          <p className="font-light tracking-wide">{t('footer.copyright', { year: currentYear })}</p>
        </div>
      </div>
    </footer>
  );

  // load CSV
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [weekly, top5, nordic, weeklyHead] = await Promise.all([
          fetchCSV(WEEKLY_CSV_URL),                                  // validates with weeklyRowSchema
          fetchCSVWithSchema<The5Row>(THE5_CSV_URL, the5RowSchema),  // validates with the5RowSchema
          fetchCSVWithSchema<NordicPickRow>(NORDIC_PICKS_CSV_URL, nordicPickRowSchema),
          fetch(WEEKLY_CSV_URL, { method: 'HEAD', cache: 'no-store' }).catch(() => null),
        ]);

        const lastModifiedHeader = weeklyHead?.ok
          ? weeklyHead.headers.get('last-modified')
          : null;
        const computedLabel = computeWeekNumber(lastModifiedHeader, weekly);

        if (!mounted) return;

        setStories(transformRowsToStories(weekly));
        setThe5Rows(top5);
        setNordicPicks(nordic);
        if (computedLabel) setWeekNumber(computedLabel);
        console.log('the_5.csv rows:', top5.length);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof CsvError ? err.message : '__unknown__');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);


  // derived lists (from loaded stories)
  const categories = useMemo(() => {
    const set = new Set(stories.map(s => s.category).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [stories]);

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        story.title.toLowerCase().includes(q) ||
        story.excerpt.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [stories, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  const currentStories = filteredStories.slice(
    (currentPage - 1) * storiesPerPage,
    currentPage * storiesPerPage
  );

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center">
              <a
                href="/"
                onClick={handleNav('/')}
                className="flex items-center no-underline focus:outline-none"
              >
                <img src={logoMark} alt="Euro5" className="w-10 h-10 mr-3" />
                <div>
                  <h1 className="text-3xl font-serif text-neutral-100 tracking-wide">Euro5</h1>
                  <p className="text-xs text-neutral-400 font-light tracking-widest uppercase">{t('header.tagline')}</p>
                </div>
              </a>
              {!isAboutRoute && !isDevRoute && (
                <span className="ml-6 px-3 py-1 text-xs font-light bg-neutral-950 text-amber-200 border border-amber-700">
                  {weekBadgeLabel}
                </span>
              )}
            </div>
            <div className="flex items-center gap-6">
              <nav className="hidden md:flex space-x-10">
                <a href="/dev" onClick={handleNav('/dev')} className={navLinkClass(isDevRoute)}>{t('navigation.dev')}</a>
                <a href="/about" onClick={handleNav('/about')} className={navLinkClass(isAboutRoute)}>{t('navigation.about')}</a>
              </nav>
              <select
                value={locale}
                onChange={(event) => setLocale(event.target.value as Locale)}
                className="bg-neutral-900 border border-neutral-700 text-neutral-100 text-sm font-light tracking-wide px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
              >
                {availableLocales.map(code => (
                  <option key={code} value={code} className="bg-neutral-900">
                    {localeLabel(code)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {!isAboutRoute && !isDevRoute && loading && (
        <div className="p-6 text-neutral-200">{t('common.loading')}</div>
      )}

      {!isAboutRoute && !isDevRoute && error && !loading && (
        <div className="m-6 p-4 bg-neutral-900 border border-red-500 text-red-200">
          <strong>{t('errors.loadDataTitle')}</strong>
          <div className="mt-2 text-sm">{errorMessage}</div>
        </div>
      )}

      {isDevRoute ? (
        <DevPage />
      ) : isAboutRoute ? (
        <AboutPage />
      ) : (
        !loading && !error && (
          <>
            {the5Rows && <The5Articles articles={the5Rows} />}
            {nordicPicks && <NordicPicks picks={nordicPicks} />}

            <StoriesGrid
              stories={currentStories}
              formatDate={formatDate}
              searchTerm={searchTerm}
              onSearch={(v) => { setSearchTerm(v); setCurrentPage(1); }}
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={(v) => { setSelectedCategory(v); setCurrentPage(1); }}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPrev={() => setCurrentPage(p => Math.max(1, p - 1))}
              onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              onJump={(page) => setCurrentPage(page)}
            />
          </>
        )
      )}

      {footer}
    </div>
  );
}

export default App;

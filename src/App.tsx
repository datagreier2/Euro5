


import { useEffect, useMemo, useState } from 'react';
import { Globe, ExternalLink, BookOpen } from 'lucide-react';

import { fetchCSV, fetchCSVWithSchema, CsvError } from './lib/fetchCsv';
import { the5RowSchema, type The5Row } from './validation-the5';
import type { WeeklyRow, NewsStory } from './types';

import FiltersBar from './components/FiltersBar';
import StoriesGrid from './components/StoriesGrid';
import Pagination from './components/Pagination';

import The5Articles from './components/The5Articles';






/* ---------- helpers (outside component) ---------- */

const WEEKLY_CSV_URL = `${import.meta.env.BASE_URL}data/weekly.csv`;
const THE5_CSV_URL   = `${import.meta.env.BASE_URL}data/the_5.csv`;

const PLACEHOLDER_IMG =
  'https://images.pexels.com/photos/1108101/pexels-photo-1108101.jpeg?auto=compress&cs=tinysrgb&w=800';

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
    category: r.category,
    publishedAt: parseDateISO(r.published_iso),
    imageUrl: PLACEHOLDER_IMG,
    readTime: toReadTime(r.summary),
  };
});
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

/* ===================== COMPONENT ===================== */
function App() {
  // data loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stories, setStories] = useState<NewsStory[]>([]);
  const [the5Rows, setThe5Rows] = useState<The5Row[] | null>(null);



  // UI state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSource, setSelectedSource] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const storiesPerPage = 12;

  // load CSV
  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const [weekly, top5] = await Promise.all([
          fetchCSV(WEEKLY_CSV_URL),                                  // validates with weeklyRowSchema
          fetchCSVWithSchema<The5Row>(THE5_CSV_URL, the5RowSchema),  // validates with the5RowSchema
        ]);
        if (!mounted) return;

        setStories(transformRowsToStories(weekly));
        setThe5Rows(top5); // not used in UI yet; ready for future features
        console.log('the_5.csv rows:', top5.length);
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof CsvError ? err.message : 'Unknown error while loading CSV.');
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

  const sources = useMemo(() => {
    const set = new Set(stories.map(s => s.source).filter(Boolean));
    return ['All', ...Array.from(set)];
  }, [stories]);

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      const q = searchTerm.toLowerCase();
      const matchesSearch =
        story.title.toLowerCase().includes(q) ||
        story.excerpt.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'All' || story.category === selectedCategory;
      const matchesSource = selectedSource === 'All' || story.source === selectedSource;
      return matchesSearch && matchesCategory && matchesSource;
    });
  }, [stories, searchTerm, selectedCategory, selectedSource]);

  const totalPages = Math.ceil(filteredStories.length / storiesPerPage);
  const currentStories = filteredStories.slice(
    (currentPage - 1) * storiesPerPage,
    currentPage * storiesPerPage
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* quick guards */}
      {loading && <div className="p-6 text-slate-200">Loading…</div>}
      {error && !loading && (
        <div className="m-6 p-4 bg-slate-800 border border-red-500 text-red-200">
          <strong>Couldn’t load data</strong>
          <div className="mt-2 text-sm">{error}</div>
        </div>
      )}

      {/* only render main content if not loading/error */}
      {!loading && !error && (
        <>
          {/* Header */}
          <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-20">
                <div className="flex items-center">
                  <Globe className="w-8 h-8 text-amber-400 mr-3" />
                  <div>
                    <h1 className="text-3xl font-serif text-slate-100 tracking-wide">The Weekly</h1>
                    <p className="text-xs text-slate-400 font-light tracking-widest uppercase">Intelligence Digest</p>
                  </div>
                  <span className="ml-6 px-3 py-1 text-xs font-light bg-amber-900 text-amber-200 border border-amber-700">
                    {/* TODO: replace with dynamic week range if desired */}
                    Week of Jan 15, 2025
                  </span>
                </div>
                <nav className="hidden md:flex space-x-10">
                  <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors font-light tracking-wide">This Week</a>
                  <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors font-light tracking-wide">Archives</a>
                  <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors font-light tracking-wide">Sources</a>
                  <a href="#" className="text-slate-300 hover:text-amber-400 transition-colors font-light tracking-wide">About</a>
                </nav>
              </div>
            </div>
          </header>
          {/* The 5 Articles Section */}
          {the5Rows && (
            <section className="max-w-3xl mx-auto px-4 py-10">
              <h2 className="text-2xl font-serif mb-8 text-amber-400">The 5 Most Important Stories</h2>
              <The5Articles articles={the5Rows} />
            </section>
          )}


          {/* Filters */}
          <FiltersBar
            searchTerm={searchTerm}
            onSearch={(v) => { setSearchTerm(v); setCurrentPage(1); }}
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={(v) => { setSelectedCategory(v); setCurrentPage(1); }}
            sources={sources}
            selectedSource={selectedSource}
            onSelectSource={(v) => { setSelectedSource(v); setCurrentPage(1); }}
          />

          {/* Grid */}
          <StoriesGrid stories={currentStories} formatDate={formatDate} />


          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={() => setCurrentPage(p => Math.max(1, p - 1))}
            onNext={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            onJump={(page) => setCurrentPage(page)}
          />

          {/* Footer */}
          <footer className="bg-slate-900 border-t border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center mb-6">
                    <Globe className="w-8 h-8 text-amber-400 mr-3" />
                    <div>
                      <h3 className="text-2xl font-serif text-slate-100 tracking-wide">The Weekly</h3>
                      <p className="text-xs text-slate-400 font-light tracking-widest uppercase">Intelligence Digest</p>
                    </div>
                  </div>
                  <p className="text-slate-400 mb-6 font-light leading-relaxed">
                    A curated intelligence briefing from the world's finest publications. 
                    Thoughtfully assembled for the discerning reader who values depth over noise.
                  </p>
                  <div className="flex space-x-6">
                    <ExternalLink className="w-5 h-5 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer" />
                    <BookOpen className="w-5 h-5 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer" />
                  </div>
                </div>
                <div>
                  <h4 className="font-serif text-slate-200 mb-6 tracking-wide">Navigation</h4>
                  <ul className="space-y-3 text-slate-400 font-light">
                    <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">This Week</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">Archives</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">Sources</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">About</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-serif text-slate-200 mb-6 tracking-wide">Briefings</h4>
                  <ul className="space-y-3 text-slate-400 font-light">
                    <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">Technology</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">Business</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">Science</a></li>
                    <li><a href="#" className="hover:text-amber-400 transition-colors tracking-wide">Health</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-slate-700 mt-12 pt-8 text-center text-slate-500">
                <p className="font-light tracking-wide">&copy; 2025 The Weekly Intelligence Digest. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;

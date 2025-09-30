import React, { useState, useMemo, useEffect } from 'react';
import { Search, Calendar, Filter, ExternalLink, Clock, Tag, Globe, BookOpen } from 'lucide-react';
import { fetchCSV, CsvError } from './lib/fetchCsv';
import type { WeeklyRow } from './types';

interface NewsStory {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  category: string;
  publishedAt: string;     // ISO
  imageUrl: string;
  readTime: number;
  isHero?: boolean;
}

/* ---------- helpers (outside component) ---------- */
const CSV_URL = '/data/weekly.csv'; // adjust if needed
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

  return sorted.map((r, idx) => ({
    id: r.id,
    title: r.title,
    excerpt: r.summary ?? '',
    source: r.source,
    category: r.category,
    publishedAt: parseDateISO(r.published_iso),
    imageUrl: PLACEHOLDER_IMG, // swap to a CSV column later if you have images
    readTime: toReadTime(r.summary),
    isHero: idx < 5, // first five are hero items
  }));
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
        const rows = await fetchCSV(CSV_URL);
        if (!mounted) return;
        setStories(transformRowsToStories(rows));
      } catch (err) {
        if (!mounted) return;
        setError(err instanceof CsvError ? err.message : 'Unknown error while loading CSV.');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
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

  const heroStories = useMemo(
    () => stories.filter(story => story.isHero),
    [stories]
  );

  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      if (story.isHero) return false; // exclude heroes from regular grid
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

          {/* Hero Section */}
          <section className="bg-slate-800 border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-serif text-slate-100 mb-3 tracking-wide">Editor's Selection</h2>
                <div className="w-24 h-px bg-amber-400 mx-auto mb-4"></div>
                <p className="text-slate-400 font-light tracking-wide">The week's most significant developments</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Main hero story */}
                <div className="lg:col-span-2">
                  <article className="group cursor-pointer border border-slate-700 bg-slate-850 hover:border-amber-600 transition-all duration-300">
                    <div className="aspect-video overflow-hidden mb-6">
                      <img
                        src={heroStories[0]?.imageUrl}
                        alt={heroStories[0]?.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-75"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center space-x-6 text-sm text-slate-400 mb-4 font-light tracking-wide">
                        <span className="flex items-center">
                          <Tag className="w-4 h-4 mr-2" />
                          {heroStories[0]?.category}
                        </span>
                        <span className="font-serif italic">{heroStories[0]?.source}</span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {heroStories[0]?.readTime} min
                        </span>
                      </div>
                      <h3 className="text-3xl font-serif text-slate-100 mb-4 leading-tight group-hover:text-amber-400 transition-colors">
                        {heroStories[0]?.title}
                      </h3>
                      <p className="text-slate-300 text-lg leading-relaxed font-light">
                        {heroStories[0]?.excerpt}
                      </p>
                    </div>
                  </article>
                </div>

                {/* Secondary hero stories */}
                <div className="space-y-8">
                  {heroStories.slice(1, 5).map((story) => (
                    <article key={story.id} className="group cursor-pointer border-b border-slate-700 pb-6 last:border-b-0">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={story.imageUrl}
                            alt={story.title}
                            className="w-24 h-24 object-cover group-hover:scale-105 transition-transform duration-300 filter brightness-75"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 text-xs text-slate-400 mb-3 font-light tracking-wide">
                            <span>{story.category}</span>
                            <span>•</span>
                            <span className="font-serif italic">{story.source}</span>
                          </div>
                          <h4 className="font-serif text-slate-100 text-lg leading-tight mb-3 group-hover:text-amber-400 transition-colors">
                            {story.title}
                          </h4>
                          <p className="text-slate-400 text-sm line-clamp-2 font-light">
                            {story.excerpt.substring(0, 100)}...
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Filters and Search */}
          <section className="bg-slate-800 border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search intelligence..."
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                    className="w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 focus:border-transparent font-light tracking-wide"
                  />
                </div>

                {/* Category Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
                    className="pl-12 pr-8 py-3 bg-slate-700 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none min-w-40 font-light tracking-wide"
                  >
                    {categories.map(category => (
                      <option key={category} value={category} className="bg-slate-700">{category}</option>
                    ))}
                  </select>
                </div>

                {/* Source Filter */}
                <div className="relative">
                  <select
                    value={selectedSource}
                    onChange={(e) => { setSelectedSource(e.target.value); setCurrentPage(1); }}
                    className="pl-4 pr-8 py-3 bg-slate-700 border border-slate-600 text-slate-100 focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none min-w-40 font-light tracking-wide"
                  >
                    {sources.map(source => (
                      <option key={source} value={source} className="bg-slate-700">{source}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Regular Stories Grid */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-between mb-12">
              <div>
                <h2 className="text-3xl font-serif text-slate-100 mb-2 tracking-wide">Weekly Briefing</h2>
                <div className="w-16 h-px bg-amber-400"></div>
              </div>
              <span className="text-slate-400 font-light tracking-wide">{filteredStories.length} reports</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {currentStories.map((story) => (
                <article key={story.id} className="bg-slate-800 border border-slate-700 hover:border-amber-600 transition-all duration-300 group cursor-pointer">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={story.imageUrl}
                      alt={story.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-75"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center space-x-4 text-sm text-slate-400 mb-4 font-light tracking-wide">
                      <span className="flex items-center">
                        <Tag className="w-4 h-4 mr-2" />
                        {story.category}
                      </span>
                      <span className="font-serif italic">{story.source}</span>
                    </div>
                    <h3 className="font-serif text-slate-100 text-xl mb-4 line-clamp-2 group-hover:text-amber-400 transition-colors leading-tight">
                      {story.title}
                    </h3>
                    <p className="text-slate-400 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-light tracking-wide">
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {story.readTime} min
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        {formatDate(story.publishedAt)}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-3">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-6 py-3 text-sm font-light text-slate-300 bg-slate-800 border border-slate-600 hover:border-amber-600 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wide"
                >
                  Previous
                </button>

                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-3 text-sm font-light tracking-wide transition-colors ${
                        currentPage === page
                          ? 'bg-amber-600 text-slate-900 border border-amber-600'
                          : 'text-slate-300 bg-slate-800 border border-slate-600 hover:border-amber-600 hover:text-amber-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-6 py-3 text-sm font-light text-slate-300 bg-slate-800 border border-slate-600 hover:border-amber-600 hover:text-amber-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors tracking-wide"
                >
                  Next
                </button>
              </div>
            )}
          </section>

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

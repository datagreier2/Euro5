import { useCallback, useEffect, useRef, useState } from 'react';
import type { The5Row } from '../validation-the5';
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from 'lucide-react';

interface The5ArticlesProps {
  articles: The5Row[];
}

export default function The5Articles({ articles }: The5ArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScrollLeft = Math.max(0, scrollWidth - clientWidth);

    // Use a small threshold to avoid flicker around float rounding values.
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < maxScrollLeft - 8);
  }, []);

  const scrollByViewport = useCallback((direction: -1 | 1) => {
    const el = scrollRef.current;
    if (!el) return;

    const amount = Math.max(0, el.clientWidth - 64); // nudge less than full width so cards peek
    el.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollState();

    const handleScroll = () => updateScrollState();
    const handleResize = () => updateScrollState();

    el.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      el.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [updateScrollState, articles.length]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-serif text-neutral-100 mb-2 tracking-wide">The 5</h2>
          <div className="w-16 h-px bg-amber-400" />
        </div>
        <span className="text-neutral-400 font-light tracking-wide">{articles.length} briefings</span>
      </div>

      <div className="relative mb-16">
        <button
          type="button"
          onClick={() => scrollByViewport(-1)}
          disabled={!canScrollLeft}
          aria-label="Scroll The 5 left"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/80 text-neutral-200 shadow-lg ring-1 ring-neutral-700 backdrop-blur transition hover:text-amber-400 disabled:opacity-40 disabled:hover:text-neutral-200"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div className="relative overflow-hidden px-1 sm:px-10 scrollbar-none" ref={scrollRef}>
          <div className="flex gap-6 sm:gap-8 min-w-max pr-4 sm:pr-0">
            {articles.map((article, idx) => {
              const title = article.short_headline || article.title;
              const summary = article.summary?.trim();
              const sourceLabel =
                article.source_name || article.source_display || article.source_domain || 'Independent';
              const initial = (sourceLabel || title)?.trim().charAt(0)?.toUpperCase() || 'A';
              const hasLink = Boolean(article.link);

              return (
                <article
                  key={`${title}-${idx}`}
                  className={`w-[13.5rem] flex-shrink-0 max-[511px]:w-72 bg-neutral-900 border border-neutral-800 hover:border-amber-600 transition-all duration-300 flex flex-col ${
                    hasLink ? 'group cursor-pointer' : ''
                  }`}
                >
                  <div className="aspect-video overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
                    <span className="text-4xl font-serif text-amber-400 select-none">
                      {initial}
                    </span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-neutral-400 mb-4 font-light tracking-wide">
                      <span className="flex items-center font-serif italic">
                        <Newspaper className="w-4 h-4 mr-2" />
                        {sourceLabel}
                      </span>
                    </div>
                    <h3 className="font-serif text-neutral-100 text-xl mb-4 leading-tight">
                      {hasLink ? (
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors group-hover:text-amber-400"
                        >
                          {title}
                        </a>
                      ) : (
                        title
                      )}
                    </h3>
                    {summary && (
                      <p className="text-neutral-400 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                        {summary}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs font-light tracking-wide text-neutral-500">
                      <span className="uppercase tracking-[0.2em] text-amber-400">Top Story</span>
                      {hasLink && (
                        <a
                          href={article.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center text-neutral-300 hover:text-amber-400 transition-colors"
                        >
                          Read story
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => scrollByViewport(1)}
          disabled={!canScrollRight}
          aria-label="Scroll The 5 right"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/80 text-neutral-200 shadow-lg ring-1 ring-neutral-700 backdrop-blur transition hover:text-amber-400 disabled:opacity-40 disabled:hover:text-neutral-200"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="mt-6 flex justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={() => scrollByViewport(-1)}
            disabled={!canScrollLeft}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-amber-500 hover:text-amber-400 disabled:opacity-40"
            aria-label="Scroll The 5 left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByViewport(1)}
            disabled={!canScrollRight}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-amber-500 hover:text-amber-400 disabled:opacity-40"
            aria-label="Scroll The 5 right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

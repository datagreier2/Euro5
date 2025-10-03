import { useCallback, useEffect, useRef, useState } from 'react';
import type { The5Row } from '../validation-the5';
import { ChevronLeft, ChevronRight, ExternalLink, Newspaper } from 'lucide-react';

const europeMapGraphics = import.meta.glob('../../data/europe_map_graphics/*/vector.svg', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

function resolveCountryGraphic(country?: string | null): string | null {
  if (!country) return null;
  const key = country.trim().toLowerCase();
  if (!key) return null;
  return europeMapGraphics[`../../data/europe_map_graphics/${key}/vector.svg`] ?? null;
}

interface The5ArticlesProps {
  articles: The5Row[];
}

export default function The5Articles({ articles }: The5ArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const scrollRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  const recalcActiveCard = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;

    const { scrollLeft, clientWidth } = container;

    const cards = cardsRef.current;
    if (!cards || cards.length === 0) return;

    const containerCenter = scrollLeft + clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card, idx) => {
      if (!card) return;
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - containerCenter);
      if (distance < closestDistance) {
        closestIndex = idx;
        closestDistance = distance;
      }
    });

    setActiveIndex(prev => (prev === closestIndex ? prev : closestIndex));
  }, []);

  const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollRef.current;
    const card = cardsRef.current[index];
    if (!container || !card) return;

    const target = card.offsetLeft - (container.clientWidth - card.offsetWidth) / 2;
    const max = Math.max(0, container.scrollWidth - container.clientWidth);
    const next = Math.min(Math.max(target, 0), max);

    container.scrollTo({ left: next, behavior });
    setActiveIndex(index);
  }, []);

  const goToRelativeCard = useCallback((direction: -1 | 1) => {
    if (!articles.length) return;
    const nextIndex = direction === -1
      ? Math.max(0, activeIndex - 1)
      : Math.min(articles.length - 1, activeIndex + 1);
    if (nextIndex === activeIndex) return;
    scrollToIndex(nextIndex);
  }, [activeIndex, articles.length, scrollToIndex]);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => recalcActiveCard();
    const handleResize = () => scrollToIndex(activeIndexRef.current, 'auto');

    recalcActiveCard();
    const frameId = window.requestAnimationFrame(() => scrollToIndex(activeIndexRef.current, 'auto'));

    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.cancelAnimationFrame(frameId);
    };
  }, [recalcActiveCard, scrollToIndex]);

  useEffect(() => {
    if (!articles.length) return;
    setActiveIndex(0);
    const id = window.requestAnimationFrame(() => scrollToIndex(0, 'auto'));
    return () => window.cancelAnimationFrame(id);
  }, [articles.length, scrollToIndex]);

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
          onClick={() => goToRelativeCard(-1)}
          disabled={activeIndex === 0}
          aria-label="Scroll The 5 left"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/80 text-neutral-200 shadow-lg ring-1 ring-neutral-700 backdrop-blur transition hover:text-amber-400 disabled:opacity-40 disabled:hover:text-neutral-200"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div
          className="relative overflow-x-auto overflow-y-hidden px-1 sm:px-10 scrollbar-none scroll-smooth"
          ref={scrollRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-6 sm:gap-8 min-w-max pr-4 sm:pr-0 snap-x snap-mandatory">
            {articles.map((article, idx) => {
              const title = article.short_headline || article.title;
              const summary = article.summary?.trim();
              const sourceLabel =
                article.source_name || article.source_display || article.source_domain || 'Independent';
              const countryCode = article.country ? String(article.country).trim().toUpperCase() : '';
              const countryGraphic = resolveCountryGraphic(countryCode);
              const hasLink = Boolean(article.link);

              return (
                <article
                  key={`${title}-${idx}`}
                  ref={el => { cardsRef.current[idx] = el; }}
                  className={`snap-center w-[13.5rem] flex-shrink-0 max-[511px]:w-72 bg-neutral-900 border border-neutral-800 hover:border-amber-600 transition-all duration-300 flex flex-col ${
                    hasLink ? 'group cursor-pointer' : ''
                  }`}
                >
                  <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
                    {countryGraphic && (
                      <img
                        src={countryGraphic}
                        alt={countryCode ? `${countryCode} map` : 'European map'}
                        className="h-full w-full object-contain p-6 opacity-80"
                      />
                    )}
                    {countryCode && (
                      <span className="absolute bottom-3 right-3 text-xs font-light uppercase tracking-[0.3em] text-neutral-400">
                        {countryCode}
                      </span>
                    )}
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
          onClick={() => goToRelativeCard(1)}
          disabled={activeIndex >= articles.length - 1}
          aria-label="Scroll The 5 right"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-neutral-950/80 text-neutral-200 shadow-lg ring-1 ring-neutral-700 backdrop-blur transition hover:text-amber-400 disabled:opacity-40 disabled:hover:text-neutral-200"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="mt-6 flex justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={() => goToRelativeCard(-1)}
            disabled={activeIndex === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-700 bg-neutral-900 text-neutral-200 hover:border-amber-500 hover:text-amber-400 disabled:opacity-40"
            aria-label="Scroll The 5 left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goToRelativeCard(1)}
            disabled={activeIndex >= articles.length - 1}
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

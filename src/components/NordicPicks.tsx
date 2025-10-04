import { useCallback, useEffect, useRef, useState } from 'react';
import type { NordicPickRow } from '../validation-nordic';
import { ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { useI18n } from '../i18n';

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

interface NordicPicksProps {
  picks: NordicPickRow[];
}

function stripHtml(summary?: string | null): string {
  if (!summary) return '';
  return summary
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export default function NordicPicks({ picks }: NordicPicksProps) {
  if (!picks || picks.length === 0) {
    return null;
  }

  const { t } = useI18n();
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
    if (!picks.length) return;
    const nextIndex = direction === -1
      ? Math.max(0, activeIndex - 1)
      : Math.min(picks.length - 1, activeIndex + 1);
    if (nextIndex === activeIndex) return;
    scrollToIndex(nextIndex);
  }, [activeIndex, picks.length, scrollToIndex]);

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
    if (!picks.length) return;
    setActiveIndex(0);
    const id = window.requestAnimationFrame(() => scrollToIndex(0, 'auto'));
    return () => window.cancelAnimationFrame(id);
  }, [picks.length, scrollToIndex]);

  return (
    <section id="norden" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 px-1 sm:px-10">
        <div>
          <h2 className="text-3xl font-serif font-semibold text-neutral-900 mb-2 tracking-wide">{t('sections.nordic.title')}</h2>
          <div className="w-16 h-px bg-amber-500" />
        </div>
      </div>

      <div className="relative mb-16">
        <button
          type="button"
          onClick={() => goToRelativeCard(-1)}
          disabled={activeIndex === 0}
          aria-label="Scroll Nordic Picks left"
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-lg ring-1 ring-neutral-200 backdrop-blur transition hover:text-amber-600 disabled:opacity-40 disabled:hover:text-neutral-600"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <div
          className="relative overflow-x-auto overflow-y-hidden px-1 sm:px-10 scrollbar-none scroll-smooth"
          ref={scrollRef}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex min-w-max pr-4 sm:pr-0 snap-x snap-mandatory divide-x divide-neutral-200">
            {picks.map((pick, idx) => {
              const title = pick.title;
              const summary = stripHtml(pick.summary);
              const sourceLabel = pick.source_name?.trim() || t('cards.defaultSource');
              const countryCode = pick.country ? String(pick.country).trim().toUpperCase() : '';
              const countryGraphic = resolveCountryGraphic(countryCode);
              const hasLink = Boolean(pick.link);

              return (
                <article
                  key={`${title}-${idx}`}
                  ref={el => { cardsRef.current[idx] = el; }}
                  className={`snap-center w-[15rem] flex-shrink-0 max-[511px]:w-72 bg-transparent transition-all duration-300 flex flex-col items-center px-6 sm:px-8 first:pl-0 sm:first:pl-0 ${
                    hasLink ? 'group cursor-pointer' : ''
                  }`}
                >
                  <div className="relative w-full max-w-[12rem] aspect-[4/3] bg-neutral-100 flex items-center justify-center">
                    {countryGraphic && (
                      <img
                        src={countryGraphic}
                        alt={countryCode ? t('cards.mapAlt', { code: countryCode }) : t('cards.mapAltFallback')}
                        className="h-full w-full object-contain p-6 opacity-90"
                      />
                    )}
                    {countryCode && (
                      <span className="absolute bottom-3 right-3 text-xs font-light uppercase tracking-[0.3em] text-neutral-500">
                        {countryCode}
                      </span>
                    )}
                  </div>
                  <div className="py-6 w-full">
                    <div className="text-sm text-neutral-500 mb-4 font-light tracking-wide">
                      <span className="font-serif italic">
                        {sourceLabel}
                      </span>
                    </div>
                    <h3 className="font-serif font-semibold text-neutral-900 text-xl mb-4 leading-tight">
                      {hasLink ? (
                        <a
                          href={pick.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="transition-colors group-hover:text-amber-600"
                        >
                          {title}
                        </a>
                      ) : (
                        title
                      )}
                    </h3>
                    {summary && (
                      <p className="text-neutral-600 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                        {summary}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <button
          type="button"
          onClick={() => goToRelativeCard(1)}
          disabled={activeIndex >= picks.length - 1}
          aria-label="Scroll Nordic Picks right"
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-neutral-600 shadow-lg ring-1 ring-neutral-200 backdrop-blur transition hover:text-amber-600 disabled:opacity-40 disabled:hover:text-neutral-600"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="mt-6 flex justify-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={() => goToRelativeCard(-1)}
            disabled={activeIndex === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 hover:border-amber-500 hover:text-amber-600 disabled:opacity-40"
            aria-label="Scroll Nordic Picks left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goToRelativeCard(1)}
            disabled={activeIndex >= picks.length - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 hover:border-amber-500 hover:text-amber-600 disabled:opacity-40"
            aria-label="Scroll Nordic Picks right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

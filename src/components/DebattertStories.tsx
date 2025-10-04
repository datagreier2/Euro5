import { useCallback, useEffect, useRef, useState } from 'react';
import type { NewsStory } from '../types';
import { Calendar, Clock, ChevronLeft, ChevronRight, Newspaper } from 'lucide-react';
import { useI18n } from '../i18n';

interface DebattertStoriesProps {
  stories: NewsStory[];
  formatDate: (iso: string) => string;
}

export default function DebattertStories({ stories, formatDate }: DebattertStoriesProps) {
  if (!stories || stories.length === 0) {
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
    if (!cards.length) return;

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
    if (!stories.length) return;
    const nextIndex = direction === -1
      ? Math.max(0, activeIndex - 1)
      : Math.min(stories.length - 1, activeIndex + 1);
    if (nextIndex === activeIndex) return;
    scrollToIndex(nextIndex);
  }, [activeIndex, stories.length, scrollToIndex]);

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
    if (!stories.length) return;
    setActiveIndex(0);
    const id = window.requestAnimationFrame(() => scrollToIndex(0, 'auto'));
    return () => window.cancelAnimationFrame(id);
  }, [stories.length, scrollToIndex]);

  return (
    <section id="debattert" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12 px-1 sm:px-10">
        <div>
          <h2 className="text-3xl font-serif font-semibold text-neutral-900 mb-2 tracking-wide">{t('sections.debattert.title')}</h2>
          <div className="w-16 h-px bg-amber-500" />
        </div>
      </div>
 
      <div className="relative mb-16">
        <button
          type="button"
          onClick={() => goToRelativeCard(-1)}
          disabled={activeIndex === 0}
          aria-label="Scroll Debattert left"
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
            {stories.map((story, idx) => (
              <article
                key={story.id}
                ref={el => { cardsRef.current[idx] = el; }}
                className="snap-center w-[15rem] flex-shrink-0 max-[511px]:w-72 bg-transparent transition-all duration-300 flex flex-col px-6 sm:px-8 first:pl-0 sm:first:pl-0"
              >
                <div className="relative aspect-video overflow-hidden bg-neutral-100">
                  <img
                    src={story.imageUrl}
                    alt={story.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="py-6">
                  <div className="flex items-center text-sm text-neutral-500 mb-4 font-light tracking-wide">
                    <span className="flex items-center font-serif italic">
                      <Newspaper className="w-4 h-4 mr-2" />
                      {story.source}
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-neutral-900 text-xl mb-4 leading-tight">
                    {story.title}
                  </h3>
                  <p className="text-neutral-600 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-neutral-500 font-light tracking-wide">
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {t('cards.readMinutes', { minutes: story.readTime })}
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
        </div>
        <button
          type="button"
          onClick={() => goToRelativeCard(1)}
          disabled={activeIndex >= stories.length - 1}
          aria-label="Scroll Debattert right"
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
            aria-label="Scroll Debattert left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => goToRelativeCard(1)}
            disabled={activeIndex >= stories.length - 1}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-600 hover:border-amber-500 hover:text-amber-600 disabled:opacity-40"
            aria-label="Scroll Debattert right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

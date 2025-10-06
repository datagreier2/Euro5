import type { NewsStory } from '../types';
import { useI18n } from '../i18n';
import FiltersBar from './FiltersBar';


type WeeklySelectionProps = {
  stories: NewsStory[];
  formatDate: (iso: string) => string;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (v: string) => void;
};

export default function WeeklySelection({
  stories,
  formatDate,
  categories,
  selectedCategory,
  onSelectCategory,
}: WeeklySelectionProps) {
  const { t } = useI18n();
  const limitedStories = stories.slice(0, 16);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-3xl font-serif text-neutral-900 mb-2 tracking-wide">{t('sections.weekly.title')}</h2>
          <div className="relative group">
            <span className="inline-flex items-center justify-center rounded-full bg-neutral-900 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white">Beta</span>
            <div className="absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-md border border-neutral-200 bg-white p-3 text-xs text-neutral-600 shadow-lg opacity-0 pointer-events-none transition-opacity duration-150 group-hover:opacity-100">
              Kategorisering er fortsatt under testing og utvikling
            </div>
          </div>
          <div className="w-16 h-px bg-amber-500"></div>
        </div>
        <span className="text-neutral-600 font-light tracking-wide" />
      </div>

      <div className="mb-6">
        <FiltersBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </div>

      <div className="mb-16 border-t border-neutral-200 divide-y divide-neutral-200">
        {limitedStories.map((story) => (
          <article
            key={story.id}
            className="py-8 group cursor-pointer flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 sm:gap-10"
          >
            <div className="flex-1">
              <div className="text-sm text-neutral-500 mb-4 font-light tracking-wide">
                <span className="font-serif italic">{story.source}</span>
              </div>
              <h3 className="font-serif font-semibold text-neutral-900 text-xl mb-4 line-clamp-2 group-hover:text-amber-600 transition-colors leading-tight">
                {story.title}
              </h3>
              <p className="text-neutral-600 text-sm line-clamp-3 font-light leading-relaxed">
                {story.excerpt}
              </p>
            </div>
            <div className="text-xs text-neutral-500 font-light tracking-wide" />
          </article>
        ))}
      </div>
    </section>
  );
}

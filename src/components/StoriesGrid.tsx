import { Calendar, Clock } from 'lucide-react';
import FiltersBar from './FiltersBar';
import type { NewsStory } from '../types';
import { useI18n } from '../i18n';


type Props = {
  stories: NewsStory[];
  formatDate: (iso: string) => string;
  searchTerm: string;
  onSearch: (v: string) => void;
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (v: string) => void;
};

export default function StoriesGrid({
  stories,
  formatDate,
  searchTerm,
  onSearch,
  categories,
  selectedCategory,
  onSelectCategory,
}: Props) {
  const { t } = useI18n();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-serif text-neutral-900 mb-2 tracking-wide">{t('sections.weekly.title')}</h2>
          <div className="w-16 h-px bg-amber-500"></div>
        </div>
        <span className="text-neutral-600 font-light tracking-wide">
          {t('sections.weekly.reportsCount', { count: stories.length })}
        </span>
      </div>

      <div className="mb-12 flex justify-start">
        <FiltersBar
          searchTerm={searchTerm}
          onSearch={onSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={onSelectCategory}
        />
      </div>

      <div className="mb-16 border-t border-neutral-200 divide-y divide-neutral-200">
        {stories.map((story) => (
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
            <div className="flex items-center justify-between text-xs text-neutral-500 font-light tracking-wide sm:flex-col sm:items-end sm:gap-3">
              <span className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {t('cards.readMinutes', { minutes: story.readTime })}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {formatDate(story.publishedAt)}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import { Calendar, Clock } from 'lucide-react';
import FiltersBar from './FiltersBar';
import type { NewsStory } from '../types';


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
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-serif text-neutral-100 mb-2 tracking-wide">Weekly Briefing [BETA]</h2>
          <div className="w-16 h-px bg-amber-400"></div>
        </div>
        <span className="text-neutral-400 font-light tracking-wide">{stories.length} reports</span>
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

      <div className="flex flex-wrap justify-start gap-8 mb-16">
        {stories.map((story) => (
          <article
            key={story.id}
            className="w-[13.5rem] max-[511px]:w-full bg-neutral-900 border border-neutral-800 hover:border-amber-600 transition-all duration-300 group cursor-pointer flex flex-col"
          >
            <div className="p-6">
              <div className="text-sm text-neutral-400 mb-4 font-light tracking-wide">
                <span className="font-serif italic">{story.source}</span>
              </div>
              <h3 className="font-serif text-neutral-100 text-xl mb-4 line-clamp-2 group-hover:text-amber-400 transition-colors leading-tight">
                {story.title}
              </h3>
              <p className="text-neutral-400 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                {story.excerpt}
              </p>
              <div className="flex items-center justify-between text-xs text-neutral-500 font-light tracking-wide">
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
    </section>
  );
}

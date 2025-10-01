import { Calendar, Clock, Tag } from 'lucide-react';
import type { NewsStory } from '../types';


type Props = {
  stories: NewsStory[];
  formatDate: (iso: string) => string;
};

export default function StoriesGrid({ stories, formatDate }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-serif text-slate-100 mb-2 tracking-wide">Weekly Briefing</h2>
          <div className="w-16 h-px bg-amber-400"></div>
        </div>
        <span className="text-slate-400 font-light tracking-wide">{stories.length} reports</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mb-16">
        {stories.map((story) => (
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
    </section>
  );
}


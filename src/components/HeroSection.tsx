import { Clock, Tag } from 'lucide-react';
import type { NewsStory } from '../types';

type Props = { heroStories: NewsStory[] };

export default function HeroSection({ heroStories }: Props) {
  if (!heroStories?.length) return null;
  const [main, ...rest] = heroStories;

  return (
    <section className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-slate-100 mb-3 tracking-wide">Editor's Selection</h2>
          <div className="w-24 h-px bg-amber-400 mx-auto mb-4"></div>
          <p className="text-slate-400 font-light tracking-wide">The week's most significant developments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main hero */}
          <div className="lg:col-span-2">
            <article className="group cursor-pointer border border-slate-700 bg-slate-850 hover:border-amber-600 transition-all duration-300">
              <div className="aspect-video overflow-hidden mb-6">
                <img
                  src={main.imageUrl}
                  alt={main.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-75"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-6 text-sm text-slate-400 mb-4 font-light tracking-wide">
                  <span className="flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    {main.category}
                  </span>
                  <span className="font-serif italic">{main.source}</span>
                  <span className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    {main.readTime} min
                  </span>
                </div>
                <h3 className="text-3xl font-serif text-slate-100 mb-4 leading-tight group-hover:text-amber-400 transition-colors">
                  {main.title}
                </h3>
                <p className="text-slate-300 text-lg leading-relaxed font-light">
                  {main.excerpt}
                </p>
              </div>
            </article>
          </div>

          {/* Secondary */}
          <div className="space-y-8">
            {rest.slice(0, 4).map(story => (
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
                      {story.excerpt?.substring(0, 100)}...
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


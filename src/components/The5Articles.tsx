import type { The5Row } from '../validation-the5';
import { ExternalLink, Newspaper } from 'lucide-react';

interface The5ArticlesProps {
  articles: The5Row[];
}

export default function The5Articles({ articles }: The5ArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-serif text-slate-100 mb-2 tracking-wide">The 5</h2>
          <div className="w-16 h-px bg-amber-400" />
        </div>
        <span className="text-slate-400 font-light tracking-wide">{articles.length} briefings</span>
      </div>

      <div className="flex flex-wrap justify-center gap-8 mb-16">
        {articles.map((article, idx) => {
          const title = article.short_headline || article.title;
          const summary = article.summary?.trim();
          const sourceLabel = article.source_display || article.source_domain || 'Independent';
          const initial = (sourceLabel || title)?.trim().charAt(0)?.toUpperCase() || 'A';
          const hasLink = Boolean(article.link);

          return (
            <article
              key={`${title}-${idx}`}
              className={`w-[13.5rem] max-[511px]:w-full bg-slate-800 border border-slate-700 hover:border-amber-600 transition-all duration-300 flex flex-col ${
                hasLink ? 'group cursor-pointer' : ''
              }`}
            >
              <div className="aspect-video overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
                <span className="text-4xl font-serif text-amber-400 select-none">
                  {initial}
                </span>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-slate-400 mb-4 font-light tracking-wide">
                  <span className="flex items-center font-serif italic">
                    <Newspaper className="w-4 h-4 mr-2" />
                    {sourceLabel}
                  </span>
                </div>
                <h3 className="font-serif text-slate-100 text-xl mb-4 line-clamp-2 leading-tight">
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
                  <p className="text-slate-400 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
                    {summary}
                  </p>
                )}
                <div className="flex items-center justify-between text-xs font-light tracking-wide text-slate-500">
                  <span className="uppercase tracking-[0.2em] text-amber-400">Top Story</span>
                  {hasLink && (
                    <a
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-slate-300 hover:text-amber-400 transition-colors"
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
    </section>
  );
}

import React from 'react';
import type { The5Row } from '../validation-the5';

interface The5ArticlesProps {
  articles: The5Row[];
}

export default function The5Articles({ articles }: The5ArticlesProps) {
  if (!articles || articles.length === 0) {
    return null; // nothing to show
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-serif text-slate-100 mb-8 tracking-wide">
        Top 5 Articles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {articles.map((a, idx) => (
          <article
            key={idx}
            className="bg-slate-800 border border-slate-700 hover:border-amber-600 transition-all duration-300 p-4"
          >
            <h3 className="font-serif text-lg text-slate-100 mb-2">
              <a
                href={a.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-amber-400"
              >
                {a.short_headline || a.title}
              </a>
            </h3>
            <p className="text-slate-400 text-sm mb-3">{a.summary}</p>
            <div className="text-xs text-slate-500 flex justify-between">
              <span>{a.source_display}</span>
              <span>{a.category}</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

import type { MouseEvent } from 'react';
import type { Locale } from '../i18n';

export type NewsMenuSection = 'the5' | 'debattert' | 'norden';

interface NewsMenuProps {
  isAboutRoute: boolean;
  isDevRoute: boolean;
  locale: Locale;
  availableLocales: Locale[];
  onLocaleChange: (locale: Locale) => void;
  onSectionClick: (section: NewsMenuSection) => (event: MouseEvent<HTMLButtonElement>) => void;
}

const formatLocale = (code: Locale): string => (
  `${code.slice(0, 1).toUpperCase()}${code.slice(1).toLowerCase()}`
);

export default function NewsMenu({
  isAboutRoute,
  isDevRoute,
  locale,
  availableLocales,
  onLocaleChange,
  onSectionClick,
}: NewsMenuProps) {
  const showSectionLinks = !isAboutRoute && !isDevRoute;

  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20">
          <div className="flex-1" />
          <nav className="flex-1 flex justify-center items-center gap-10 text-sm font-light tracking-wide text-neutral-600">
            {showSectionLinks && (
              <>
                <button
                  type="button"
                  onClick={onSectionClick('the5')}
                  className="hover:text-amber-600 transition-colors uppercase whitespace-nowrap bg-transparent border-0 p-0 focus:outline-none"
                >
                  De 5
                </button>
                <button
                  type="button"
                  onClick={onSectionClick('debattert')}
                  className="hover:text-amber-600 transition-colors uppercase bg-transparent border-0 p-0 focus:outline-none"
                >
                  Debattert
                </button>
                <button
                  type="button"
                  onClick={onSectionClick('norden')}
                  className="hover:text-amber-600 transition-colors uppercase bg-transparent border-0 p-0 focus:outline-none"
                >
                  Norden
                </button>
              </>
            )}
          </nav>
          <div className="flex-1 flex justify-end">
            <select
              value={locale}
              onChange={(event) => onLocaleChange(event.target.value as Locale)}
              className="bg-white border border-neutral-300 text-neutral-700 text-sm font-light tracking-wide px-3 py-2 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              {availableLocales.map(code => (
                <option key={code} value={code} className="bg-white">
                  {formatLocale(code)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

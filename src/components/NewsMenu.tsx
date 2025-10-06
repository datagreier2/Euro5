import type { MouseEvent } from 'react';

export type NewsMenuSection = 'the5' | 'debattert' | 'norden';

interface NewsMenuProps {
  isAboutRoute: boolean;
  isDevRoute: boolean;
  onSectionClick: (section: NewsMenuSection) => (event: MouseEvent<HTMLButtonElement>) => void;
}

export default function NewsMenu({
  isAboutRoute,
  isDevRoute,
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
          <div className="flex-1 flex justify-end" />
        </div>
      </div>
    </header>
  );
}

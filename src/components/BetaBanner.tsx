import type { Locale } from '../i18n';

interface BetaBannerProps {
  message?: string;
  locale: Locale;
  availableLocales: Locale[];
  onLocaleChange: (locale: Locale) => void;
}

const formatLocale = (code: Locale): string => (
  `${code.slice(0, 1).toUpperCase()}${code.slice(1).toLowerCase()}`
);

export default function BetaBanner({
  message = '[BETA: B-v7.2  F-v3.0]',
  locale,
  availableLocales,
  onLocaleChange,
}: BetaBannerProps) {
  return (
    <div className="bg-neutral-900 text-neutral-100 text-xs uppercase">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 lg:px-8">
        <span className="tracking-[0.2em] text-center sm:text-left">{message}</span>
        <div className="relative w-full max-w-[9rem] self-center sm:self-auto">
          <select
            value={locale}
            onChange={(event) => onLocaleChange(event.target.value as Locale)}
            aria-label="Change language"
            className="w-full appearance-none rounded-none bg-neutral-900 border border-neutral-700 px-3 py-2 pr-9 text-[0.7rem] tracking-[0.2em] text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-400"
          >
            {availableLocales.map(code => (
              <option key={code} value={code} className="bg-neutral-900 text-neutral-100">
                {formatLocale(code)}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-neutral-400">
            <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 0 1 1.4-1.4L10 9.6l3.3-3.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-.7.3Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

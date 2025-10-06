import type { Locale } from '../i18n';

interface BetaBannerProps {
  message?: string;
  locale: Locale;
  availableLocales: Locale[];
  onLocaleChange: (locale: Locale) => void;
  showLocalePicker?: boolean;
}

const formatLocale = (code: Locale): string => (
  `${code.slice(0, 1).toUpperCase()}${code.slice(1).toLowerCase()}`
);

export default function BetaBanner({
  message = '[BETA: B-v7.2  F-v3.0]',
  locale,
  availableLocales,
  onLocaleChange,
  showLocalePicker = true,
}: BetaBannerProps) {
  const paddingClasses = showLocalePicker ? 'pr-28 sm:pr-36' : '';

  return (
    <div className="bg-neutral-900 text-neutral-100 text-xs uppercase">
      <div className={`relative mx-auto max-w-7xl px-4 py-2 text-center sm:px-6 lg:px-8 ${paddingClasses}`}>
        <a
          href="/dev"
          className="tracking-[0.2em] text-neutral-100 transition-colors hover:text-amber-400"
        >
          {message}
        </a>
        {showLocalePicker && (
          <>
            <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-neutral-400 sm:right-6">
              <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M10 12a1 1 0 0 1-.7-.3l-4-4a1 1 0 0 1 1.4-1.4L10 9.6l3.3-3.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-.7.3Z" />
              </svg>
            </div>
            <select
              value={locale}
              onChange={(event) => onLocaleChange(event.target.value as Locale)}
              aria-label="Change language"
              className="absolute inset-y-1 right-4 block w-24 appearance-none rounded-none bg-neutral-900 border border-neutral-700 px-3 py-2 pr-6 text-[0.7rem] tracking-[0.2em] text-neutral-100 focus:outline-none focus:ring-1 focus:ring-amber-400 sm:right-6 sm:w-32"
            >
              {availableLocales.map(code => (
                <option key={code} value={code} className="bg-neutral-900 text-neutral-100">
                  {formatLocale(code)}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </div>
  );
}

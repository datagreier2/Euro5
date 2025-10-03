import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import { en } from './translations/en';
import { nb } from './translations/nb';
import { nn } from './translations/nn';
import { da } from './translations/da';
import { sv } from './translations/sv';

type TranslationShape = typeof en;

const translations = {
  en,
  nb,
  nn,
  da,
  sv,
} as const;

export type Locale = keyof typeof translations;

type Replacements = Record<string, string | number>;

type TranslateFn = (key: string, replacements?: Replacements) => string;

type I18nContextValue = {
  locale: Locale;
  setLocale: (next: Locale) => void;
  availableLocales: Locale[];
  t: TranslateFn;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function resolveKey(obj: TranslationShape, key: string) {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

function format(template: string, replacements: Replacements | undefined) {
  if (!replacements) return template;
  return template.replace(/{{(.*?)}}/g, (_, rawKey: string) => {
    const trimmed = rawKey.trim();
    const value = replacements[trimmed];
    return value === undefined || value === null ? '' : String(value);
  });
}

export function I18nProvider({ children, defaultLocale = 'nb' }: { children: ReactNode; defaultLocale?: Locale }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  const translate = useCallback<TranslateFn>((key, replacements) => {
    const primary = resolveKey(translations[locale], key);
    const fallback = locale !== 'en' ? resolveKey(translations.en, key) : undefined;
    const template = typeof primary === 'string'
      ? primary
      : typeof fallback === 'string'
        ? fallback
        : key;
    return format(template, replacements);
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    setLocale: setLocaleState,
    availableLocales: Object.keys(translations) as Locale[],
    t: translate,
  }), [locale, translate]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return ctx;
}

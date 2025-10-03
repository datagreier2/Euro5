import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';          // <-- this import is essential
import { I18nProvider, Locale } from './i18n';

function detectLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language.toLowerCase();
  if (lang.startsWith('nb') || lang.startsWith('no')) return 'nb';
  if (lang.startsWith('da')) return 'da';
  if (lang.startsWith('sv')) return 'sv';
  return 'en';
}

const defaultLocale = detectLocale();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider defaultLocale={defaultLocale}>
      <App />
    </I18nProvider>
  </StrictMode>
);

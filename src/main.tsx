import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';          // <-- this import is essential
import { I18nProvider } from './i18n';

const defaultLocale = typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('nb')
  ? 'nb'
  : 'en';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider defaultLocale={defaultLocale}>
      <App />
    </I18nProvider>
  </StrictMode>
);

export const nb = {
  common: {
    loading: 'Laster…',
  },
  errors: {
    loadDataTitle: 'Kunne ikke hente data',
    unknownCsv: 'Ukjent feil under lasting av CSV.',
  },
  header: {
    weekLabel: 'Uke {{week}}',
    weekFallback: 'Uke --',
    tagline: 'Europeiske nyhetsoppsummeringer',
  },
  navigation: {
    thisWeek: 'Denne uken',
    archives: 'Arkiv',
    sources: 'Kilder',
    about: 'Om',
  },
  sections: {
    the5: {
      title: 'De 5',
      countLabel: '{{count}} sammendrag',
    },
    nordic: {
      title: 'Nordiske utvalgte',
      tagline: 'Kuraterte regionale innsikter',
    },
    weekly: {
      title: 'Ukentlig brief [BETA]',
      reportsCount: '{{count}} rapporter',
    },
  },
  filters: {
    searchPlaceholder: 'Søk i innsikt…',
    allCategory: 'Alle',
  },
  pagination: {
    previous: 'Forrige',
    next: 'Neste',
  },
  cards: {
    defaultSource: 'Uavhengig',
    readMinutes: '{{minutes}} min',
    mapAlt: 'Kart over {{code}}',
    mapAltFallback: 'Kart over Europa',
  },
  footer: {
    brandTitle: 'The Weekly',
    brandSubtitle: 'Etterretningsoversikt',
    description: 'En kuratert etterretningsbrief fra verdens beste publikasjoner. Omhyggelig satt sammen for den kresne leseren som verdsetter dybde fremfor støy.',
    navigationTitle: 'Navigasjon',
    briefingsTitle: 'Briefinger',
    briefings: {
      technology: 'Teknologi',
      business: 'Næringsliv',
      science: 'Vitenskap',
      health: 'Helse',
    },
    copyright: '© {{year}} The Weekly Intelligence Digest. Alle rettigheter forbeholdt.',
  },
  locales: {
    en: 'Engelsk',
    nb: 'Norsk',
  },
};

export type TranslationNb = typeof nb;

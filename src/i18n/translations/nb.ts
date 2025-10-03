export const nb = {
  common: {
    loading: 'Laster…',
  },
  errors: {
    loadDataTitle: 'Kunne ikke hente data',
    unknownCsv: 'Ukjent feil under lasting av data.',
  },
  header: {
    weekLabel: 'Uke {{week}}',
    weekFallback: 'Uke --',
    tagline: 'Nyheter fra Europa',
  },
  navigation: {
    thisWeek: 'Denne uken',
    archives: 'Arkiv',
    sources: 'Kilder',
    about: 'Om',
  },
  sections: {
    the5: {
      title: 'Ukens 5',
      countLabel: '{{count}} sammendrag',
    },
    nordic: {
      title: 'Fra Norden',
      tagline: 'Hentet fra Nordiske redaksjoner'
    },
    weekly: {
      title: 'Ukentlig utvalg [BETA]',
      reportsCount: '{{count}} rapporter',
    },
  },
  filters: {
    searchPlaceholder: 'Søk [BETA]',
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
    brandTitle: 'Euro5',
    brandSubtitle: 'Nyheter fra Europa',
    description: 'Automatisert nyhetsinnsamling for støtte menneskelig journalistikk',
    navigationTitle: 'Navigasjon',
    briefingsTitle: 'Briefinger',
    briefings: {
      technology: 'Teknologi',
      business: 'Næringsliv',
      science: 'Vitenskap',
      health: 'Helse',
    },
    copyright: '© {{year}} Aron Lindegård. Alle rettigheter forbeholdt.',
  },
  locales: {
    en: 'Engelsk',
    nb: 'Norsk',
    nn: 'Nynorsk',
    da: 'Dansk',
    sv: 'Svensk',
  },
};

export type TranslationNb = typeof nb;

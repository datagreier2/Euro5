export const nn = {
  common: {
    loading: 'Lastar…',
  },
  errors: {
    loadDataTitle: 'Klarte ikkje hente data',
    unknownCsv: 'Ukjend feil under lasting av CSV.',
  },
  header: {
    weekLabel: 'Veke {{week}}',
    weekFallback: 'Veke --',
    tagline: 'Europeiske nyheitsoppsummeringar',
  },
  navigation: {
    thisWeek: 'Denne veka',
    archives: 'Arkiv',
    sources: 'Kjelder',
    about: 'Om',
  },
  sections: {
    the5: {
      title: 'Dei 5',
      countLabel: '{{count}} samandrag',
    },
    nordic: {
      title: 'Nordiske utvalde',
      tagline: 'Kuraterte regionale innsikter',
    },
    weekly: {
      title: 'Vekebrev [BETA]',
      reportsCount: '{{count}} rapportar',
    },
  },
  filters: {
    searchPlaceholder: 'Søk i innsiktar…',
    allCategory: 'Alle',
  },
  pagination: {
    previous: 'Førre',
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
    brandSubtitle: 'Etterretningsoversyn',
    description: 'Ei kuratert etterretningsbrief frå verdas beste publikasjonar. Omsorgsfullt sett saman for den kravstore lesaren som verdset djupne framfor støy.',
    navigationTitle: 'Navigasjon',
    briefingsTitle: 'Briefar',
    briefings: {
      technology: 'Teknologi',
      business: 'Næringsliv',
      science: 'Vitskap',
      health: 'Helse',
    },
    copyright: '© {{year}} The Weekly Intelligence Digest. Alle rettar forbehaldne.',
  },
  locales: {
    en: 'Engelsk',
    nb: 'Bokmål',
    nn: 'Nynorsk',
    da: 'Dansk',
    sv: 'Svensk',
  },
};

export type TranslationNn = typeof nn;

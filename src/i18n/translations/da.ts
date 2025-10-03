export const da = {
  common: {
    loading: 'Indlæser…',
  },
  errors: {
    loadDataTitle: 'Kunne ikke indlæse data',
    unknownCsv: 'Ukendt fejl under indlæsning af CSV.',
  },
  header: {
    weekLabel: 'Uge {{week}}',
    weekFallback: 'Uge --',
    tagline: 'Europæiske nyhedsbriefs',
  },
  navigation: {
    thisWeek: 'Denne uge',
    archives: 'Arkiv',
    sources: 'Kilder',
    about: 'Om',
  },
  sections: {
    the5: {
      title: 'De 5',
      countLabel: '{{count}} briefs',
    },
    nordic: {
      title: 'Nordiske udvalgte',
      tagline: 'Kuraterede regionale indsigter',
    },
    weekly: {
      title: 'Ugentlig brief [BETA]',
      reportsCount: '{{count}} rapporter',
    },
  },
  filters: {
    searchPlaceholder: 'Søg i indsigter…',
    allCategory: 'Alle',
  },
  pagination: {
    previous: 'Forrige',
    next: 'Næste',
  },
  cards: {
    defaultSource: 'Uafhængig',
    readMinutes: '{{minutes}} min',
    mapAlt: 'Kort over {{code}}',
    mapAltFallback: 'Kort over Europa',
  },
  footer: {
    brandTitle: 'The Weekly',
    brandSubtitle: 'Efterretningsdigest',
    description: 'Et kurateret efterretningsbrief fra verdens bedste medier. Omhyggeligt sammensat til den kræsne læser, der værdsætter dybde frem for støj.',
    navigationTitle: 'Navigation',
    briefingsTitle: 'Briefs',
    briefings: {
      technology: 'Teknologi',
      business: 'Erhverv',
      science: 'Videnskab',
      health: 'Sundhed',
    },
    copyright: '© {{year}} The Weekly Intelligence Digest. Alle rettigheder forbeholdes.',
  },
  locales: {
    en: 'Engelsk',
    nb: 'Norsk (bokmål)',
    nn: 'Norsk (nynorsk)',
    da: 'Dansk',
    sv: 'Svensk',
  },
};

export type TranslationDa = typeof da;

export const sv = {
  common: {
    loading: 'Laddar…',
  },
  errors: {
    loadDataTitle: 'Kunde inte läsa in data',
    unknownCsv: 'Okänt fel vid inläsning av CSV.',
  },
  header: {
    weekLabel: 'Vecka {{week}}',
    weekFallback: 'Vecka --',
    tagline: 'Europeiska nyhetsbrev',
  },
  navigation: {
    thisWeek: 'Denna vecka',
    archives: 'Arkiv',
    sources: 'Källor',
    about: 'Om',
  },
  sections: {
    the5: {
      title: 'De 5',
      countLabel: '{{count}} briefings',
    },
    nordic: {
      title: 'Nordiska urval',
      tagline: 'Kuraterade regionala insikter',
    },
    weekly: {
      title: 'Veckobrief [BETA]',
      reportsCount: '{{count}} rapporter',
    },
  },
  filters: {
    searchPlaceholder: 'Sök i insikter…',
    allCategory: 'Alla',
  },
  pagination: {
    previous: 'Föregående',
    next: 'Nästa',
  },
  cards: {
    defaultSource: 'Oberoende',
    readMinutes: '{{minutes}} min',
    mapAlt: 'Karta över {{code}}',
    mapAltFallback: 'Karta över Europa',
  },
  footer: {
    brandTitle: 'The Weekly',
    brandSubtitle: 'Underrättelserapport',
    description: 'En kuraterad underrättelsebrief från världens främsta publikationer. Omsorgsfullt sammanställd för den kräsna läsaren som värdesätter djup framför brus.',
    navigationTitle: 'Navigation',
    briefingsTitle: 'Briefings',
    briefings: {
      technology: 'Teknik',
      business: 'Affärer',
      science: 'Vetenskap',
      health: 'Hälsa',
    },
    copyright: '© {{year}} The Weekly Intelligence Digest. Alla rättigheter förbehållna.',
  },
  locales: {
    en: 'Engelska',
    nb: 'Norska (bokmål)',
    nn: 'Norska (nynorska)',
    da: 'Danska',
    sv: 'Svenska',
  },
};

export type TranslationSv = typeof sv;

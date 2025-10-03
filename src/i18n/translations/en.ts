export const en = {
  common: {
    loading: 'Loading…',
  },
  errors: {
    loadDataTitle: 'Couldn’t load data',
    unknownCsv: 'Unknown error while loading CSV.',
  },
  header: {
    weekLabel: 'Week {{week}}',
    weekFallback: 'Week --',
    tagline: 'European news briefings',
  },
  navigation: {
    thisWeek: 'This Week',
    archives: 'Archives',
    sources: 'Sources',
    about: 'About',
  },
  sections: {
    the5: {
      title: 'The 5',
      countLabel: '{{count}} briefings',
    },
    nordic: {
      title: 'Nordic Picks',
      tagline: 'Curated regional insights',
    },
    weekly: {
      title: 'Weekly Briefing [BETA]',
      reportsCount: '{{count}} reports',
    },
  },
  filters: {
    searchPlaceholder: 'Search intelligence…',
    allCategory: 'All',
  },
  pagination: {
    previous: 'Previous',
    next: 'Next',
  },
  cards: {
    defaultSource: 'Independent',
    readMinutes: '{{minutes}} min',
    mapAlt: '{{code}} map',
    mapAltFallback: 'European map',
  },
  footer: {
    brandTitle: 'The Weekly',
    brandSubtitle: 'Intelligence Digest',
    description: "A curated intelligence briefing from the world's finest publications. Thoughtfully assembled for the discerning reader who values depth over noise.",
    navigationTitle: 'Navigation',
    briefingsTitle: 'Briefings',
    briefings: {
      technology: 'Technology',
      business: 'Business',
      science: 'Science',
      health: 'Health',
    },
    copyright: '© {{year}} The Weekly Intelligence Digest. All rights reserved.',
  },
  locales: {
    en: 'English',
    nb: 'Norwegian',
    da: 'Danish',
    sv: 'Swedish',
  },
};

export type TranslationEn = typeof en;

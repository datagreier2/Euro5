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
  aboutPage: {
    heroTitle: 'About Euro5',
    heroSubtitle: 'Euro5 distills pan-European reporting into daily intelligence for Nordic readers.',
    missionTitle: 'Our mission',
    missionBody: 'We surface the five most important continental stories each morning, pair them with Nordic context, and deliver a weekly intelligence briefing for decision makers.',
    valuesTitle: 'What guides us',
    values: {
      rapidResponseTitle: 'Rapid response',
      rapidResponseBody: 'We track emerging developments in real time so our briefings stay actionable.',
      curatedBriefingsTitle: 'Curated briefings',
      curatedBriefingsBody: 'Each pick is hand-reviewed by editors with regional expertise.',
      panEuropeanTitle: 'Pan-European lens',
      panEuropeanBody: 'We translate local reporting into insights relevant across the Nordics.',
      trustedSourcesTitle: 'Trusted sources',
      trustedSourcesBody: 'We collaborate with leading European publications and verify every citation.',
    },
    teamTitle: 'Editorial desk',
    teamBody: 'Euro5 is produced by a distributed team of journalists, analysts, and translators based in Oslo, Copenhagen, Stockholm, and Reykjavik.',
    contactTitle: 'Get in touch',
    contactBody: 'Reach the desk for partnerships, tips, or to join the briefing list.',
    contactEmail: 'contact@euro5.news',
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
    nn: 'Norwegian (Nynorsk)',
    da: 'Danish',
    sv: 'Swedish',
  },
};

export type TranslationEn = typeof en;

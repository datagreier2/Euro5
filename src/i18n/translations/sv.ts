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
    dev: 'Utveckling',
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
    debattert: {
      title: 'Mest debatterat',
      tagline: '{{count}} debatter',
    },
    weekly: {
      title: 'Veckobrief [BETA]',
      reportsCount: '{{count}} rapporter',
    },
  },
  aboutPage: {
    heroTitle: 'Om Euro5',
    heroSubtitle: 'Euro5 destillerar europeisk journalistik till dagliga underrättelsebriefingar för nordiska läsare.',
    missionTitle: 'Vårt uppdrag',
    missionBody: 'Varje morgon lyfter vi fram de fem viktigaste kontinentalnyheterna, sätter dem i nordiskt sammanhang och levererar en veckovis briefing för beslutsfattare.',
    valuesTitle: 'Det som vägleder oss',
    values: {
      rapidResponseTitle: 'Snabb respons',
      rapidResponseBody: 'Vi följer utvecklingen i realtid så att våra briefingar förblir handlingsbara.',
      curatedBriefingsTitle: 'Kuraterade briefingar',
      curatedBriefingsBody: 'Varje urval granskas manuellt av redaktörer med regional expertis.',
      panEuropeanTitle: 'Paneuropeiskt perspektiv',
      panEuropeanBody: 'Vi översätter lokal rapportering till insikter som är relevanta i hela Norden.',
      trustedSourcesTitle: 'Pålitliga källor',
      trustedSourcesBody: 'Vi samarbetar med ledande europeiska publikationer och verifierar varje referens.',
    },
    teamTitle: 'Redaktionen',
    teamBody: 'Euro5 produceras av ett distribuerat team av journalister, analytiker och översättare i Oslo, Köpenhamn, Stockholm och Reykjavik.',
    contactTitle: 'Kontakta oss',
    contactBody: 'Hör av dig för partnerskap, tips eller för att få briefingen i inkorgen.',
    contactEmail: 'contact@euro5.news',
  },
  devPage: {
    title: 'Utvecklingslogg',
    subtitle: 'Interna anteckningar om förbättringar och kända problem.',
    loading: 'Laddar ändringslogg…',
    errorTitle: 'Kunde inte läsa in ändringsloggen',
    commitsHeading: 'Senaste commits',
    issuesHeading: 'Kända problem',
    emptyState: 'Inga poster registrerade ännu.',
    noEntry: '—',
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

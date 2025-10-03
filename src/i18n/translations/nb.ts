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
      countLabel: '{{count}} utvalgte',
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
  aboutPage: {
    heroTitle: 'Om Euro5',
    heroSubtitle: 'Euro5 destillerer europeisk journalistikk til daglige innsiktsbrief for nordiske lesere.',
    missionTitle: 'Vårt oppdrag',
    missionBody: 'Vi løfter fram de fem viktigste sakene fra kontinentet hver morgen, tilfører nordisk kontekst og leverer en ukentlig etterretningsbrief til beslutningstakere.',
    valuesTitle: 'Dette styrer oss',
    values: {
      rapidResponseTitle: 'Rask respons',
      rapidResponseBody: 'Vi følger utviklingen i sanntid slik at briefene våre alltid er handlekraftige.',
      curatedBriefingsTitle: 'Kuraterte brief',
      curatedBriefingsBody: 'Hver utvalgte sak kvalitetssikres av redaktører med regional spisskompetanse.',
      panEuropeanTitle: 'Paneuropeisk blikk',
      panEuropeanBody: 'Vi oversetter lokale kilder til innsikt som er relevant i hele Norden.',
      trustedSourcesTitle: 'Pålitelige kilder',
      trustedSourcesBody: 'Vi samarbeider med ledende europeiske publikasjoner og verifiserer alle kilder.',
    },
    teamTitle: 'Redaksjonen',
    teamBody: 'Euro5 produseres av et distribuert team av journalister, analytikere og oversettere i Oslo, København, Stockholm og Reykjavik.',
    contactTitle: 'Kontakt oss',
    contactBody: 'Ta kontakt for partnerskap, tips eller innspill til brief-listen.',
    contactEmail: 'contact@euro5.news',
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

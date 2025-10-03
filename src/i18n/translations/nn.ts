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
  aboutPage: {
    heroTitle: 'Om Euro5',
    heroSubtitle: 'Euro5 destillerer europeisk journalistikk til daglege innsiktsbrief for nordiske lesarar.',
    missionTitle: 'Vårt oppdrag',
    missionBody: 'Vi løfter fram dei fem viktigaste sakene frå kontinentet kvar morgon, set dei i nordisk samanheng og leverer eit vekebrev for avgjerdstakarar.',
    valuesTitle: 'Dette styrer oss',
    values: {
      rapidResponseTitle: 'Rask respons',
      rapidResponseBody: 'Vi følgjer utviklinga i sanntid slik at briefane våre er handlekraftige.',
      curatedBriefingsTitle: 'Kuraterte brief',
      curatedBriefingsBody: 'Kvar utvald sak vert kvalitetssikra av redaktørar med regional spisskompetanse.',
      panEuropeanTitle: 'Paneuropeisk perspektiv',
      panEuropeanBody: 'Vi omset lokale kjelder til innsikt som er relevant i heile Norden.',
      trustedSourcesTitle: 'Pålitelege kjelder',
      trustedSourcesBody: 'Vi samarbeider med leiande europeiske medium og verifiserer alle sitat.',
    },
    teamTitle: 'Redaksjonen',
    teamBody: 'Euro5 vert produsert av eit distribuert team av journalistar, analytikarar og omsetjarar i Oslo, København, Stockholm og Reykjavik.',
    contactTitle: 'Kontakt oss',
    contactBody: 'Ta kontakt for samarbeid, tips eller for å bli med på distribusjonslista.',
    contactEmail: 'contact@euro5.news',
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

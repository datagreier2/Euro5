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
    dev: 'Udvikling',
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
  aboutPage: {
    heroTitle: 'Om Euro5',
    heroSubtitle: 'Euro5 destillerer europæisk journalistik til daglige efterretningsbriefs for nordiske læsere.',
    missionTitle: 'Vores mission',
    missionBody: 'Vi finder hver morgen de fem vigtigste historier fra kontinentet, tilfører nordisk kontekst og leverer en ugentlig efterretningsbrief til beslutningstagere.',
    valuesTitle: 'Det der styrer os',
    values: {
      rapidResponseTitle: 'Hurtig respons',
      rapidResponseBody: 'Vi følger udviklingen i realtid, så vores briefings altid kan bruges med det samme.',
      curatedBriefingsTitle: 'Kuraterede briefings',
      curatedBriefingsBody: 'Hvert valg gennemgås i hånden af redaktører med regional ekspertise.',
      panEuropeanTitle: 'Paneuropæisk perspektiv',
      panEuropeanBody: 'Vi oversætter lokale historier til indsigter, der giver mening i hele Norden.',
      trustedSourcesTitle: 'Troværdige kilder',
      trustedSourcesBody: 'Vi samarbejder med førende europæiske medier og verificerer hver kilde.',
    },
    teamTitle: 'Redaktionen',
    teamBody: 'Euro5 produceres af et distribueret hold af journalister, analytikere og oversættere i Oslo, København, Stockholm og Reykjavik.',
    contactTitle: 'Kontakt os',
    contactBody: 'Skriv for partnerskaber, tips eller for at komme på briefing-listen.',
    contactEmail: 'contact@euro5.news',
  },
  devPage: {
    title: 'Udviklingslog',
    subtitle: 'Interne noter om forbedringer og kendte problemer.',
    loading: 'Indlæser ændringslog…',
    errorTitle: 'Kunne ikke indlæse ændringslog',
    commitsHeading: 'Seneste commits',
    issuesHeading: 'Kendte problemer',
    emptyState: 'Ingen poster registreret endnu.',
    noEntry: '—',
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

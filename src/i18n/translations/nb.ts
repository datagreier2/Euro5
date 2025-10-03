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
    dev: 'Utvikling',
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
    heroSubtitle: 'Nyheter fra Europa for skandinaviske lesere',
    missionTitle: 'Hvorfor?',
    missionBody: '<p>Euro5 startet med en idé – eller kanskje mer presist, en frustrasjon.</p><p>Hvorfor er det så vanskelig å lese europeiske nyheter?</p><p>Teknologigigantene serverer oss nyheter som en endeløs TikTok-feed, fylt med overskrifter fra seriøse og tvilsomme kilder om hverandre. Samtidig sitter dyktige journalister over hele kontinentet og produserer kvalitetsjournalistikk – ofte i redaksjoner med sterk pressefrihet og tradisjon for grundig arbeid. Likevel leser vi altfor lite av hverandres journalistikk på tvers av landegrenser.</p><p>Det er selvsagt mulig å åpne aviser fra hele Europa, men hvor ofte gjør man egentlig det? Hvem tar seg tid til å klikke seg inn på dusinvis av nettsteder for å få et mer helhetlig, europeisk perspektiv på verden?</p><p>Euro5 er et forsøk på å knytte europa nærmere sammen, gjennom å gjøre det enklere å lese hverandres nyheter.</p><p>Den nåværende versjonen er laget for Skandinavia og inkluderer nyheter på svensk, norsk og dansk i tillegg til engelsk.</p>',
    valuesTitle: 'Dette styrer oss',
    values: {
      rapidResponseTitle: 'Maskinkuratert',
      rapidResponseBody: 'For å kuratere tusenvis av nyhetssaker hver uke, brukes enkle algoritmer i flere steg for å sortere og velge ut saker med høyest mulig kvalitet og bredde. I motsetning til teknologigigigantenes algoritmer er de ikke laget for å gi mest mulig lesetid eller personlig tilpasset. De brukes kun for å sortere tusenvis av artikler ned til et spiselig antall. ',
      curatedBriefingsTitle: 'Kunstig intelligens',
      curatedBriefingsBody: 'Algoritmene bruker IKKE kunstig intelligens til å kuratere innholdet direkte. KI brukes kun til å hjelpe til med kategorisering og koding.',
      panEuropeanTitle: 'Paneuropeisk blikk',
      panEuropeanBody: 'De fleste nyhetskilder har et nasjonalt eller amerikansk fokus. Hos Euro5 fremhever vi nyheter fra Europa, som de fleste av oss ellers ville gått glipp av',
      trustedSourcesTitle: 'Pålitelige kilder',
      trustedSourcesBody: 'Vi streber etter å hente nyheter fra de mest troverdige og ansvarlige nyhetskildene i Europa. Med begrenset kapasitet kan det vanskelig å være perfekt, men vi forsøker å ha så gode redaksjonener som mulig i våre kildelister. ',
    },
    teamTitle: 'Redaksjonen',
    teamBody: 'Redaksjonen vår er en maskin. Vi kaller det en maskin som jobber for menneskelig journalistikk.',
    contactTitle: 'Kontakt oss',
    contactBody: 'Ta kontakt for partnerskap, tips eller innspill til brief-listen.',
    contactEmail: 'mail@mail.mail',
  },
  devPage: {
    title: 'Utviklingslogg',
    subtitle: 'Interne notater om forbedringer og kjente problemer.',
    loading: 'Laster endringslogg…',
    errorTitle: 'Kunne ikke laste endringslogg',
    commitsHeading: 'Siste endringer',
    issuesHeading: 'Kjente feil',
    emptyState: 'Ingen oppføringer registrert ennå.',
    noEntry: '—',
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

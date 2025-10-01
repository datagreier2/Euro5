// Raw shape straight from your CSV file
export interface WeeklyRow {
  category: string;
  subgroup?: string | null;

  source_name: string;
  source_url?: string | null;
  source_method?: string | null;

  title: string;
  summary?: string | null;
  link: string;
  published_iso?: string | null;

  country_infer?: string | null;
  is_SCANDI?: string | boolean | null;
  is_usa?: string | boolean | null;

  debate_score?: string | number | null;
  __base_score?: string | number | null;
  most_debated_score?: string | number | null;
  reddit_matches?: string | number | null;

  // safety net: allows extra CSV columns if added in future
  [key: string]: unknown;
}

// Normalized UI model for your React components
export interface NewsStory {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  category: string;
  publishedAt: string;   // normalized ISO string
  imageUrl: string;
  readTime: number;
  isHero?: boolean;
}

export interface The5Row {
  short_headline: string;      // short display text
  title: string;               // full headline
  summary?: string | null;
  link: string;                // URL
  source_display: string;      // e.g. "The Guardian"
  source_domain: string;       // e.g. "theguardian.com"
  category: string;            // your taxonomy
}

// src/types.ts
export interface WeeklyRow {
  category: string;
  subgroup?: string | null;

  source_name: string;           // <-- use this to display "source"
  source_url?: string | null;
  source_method?: string | null;

  title: string;
  summary?: string | null;
  link: string;                  // <-- required (we'll link to this)
  published_iso?: string | null;

  country_infer?: string | null;
  is_SCANDI?: string | boolean | null;
  is_usa?: string | boolean | null;

  debate_score?: string | number | null;
  __base_score?: string | number | null;
  most_debated_score?: string | number | null;
  reddit_matches?: string | number | null;

  // allow any extra columns without breaking
  [key: string]: unknown;
}

// src/types.ts
export interface WeeklyRow { /* ...your existing WeeklyRow... */ }

export interface NewsStory {
  id: string;
  title: string;
  excerpt: string;
  source: string;
  category: string;
  publishedAt: string;   // ISO
  imageUrl: string;
  readTime: number;
  isHero?: boolean;
}

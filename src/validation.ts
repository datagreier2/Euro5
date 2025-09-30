// src/validation.ts
import { z } from 'zod';

export const weeklyRowSchema = z.object({
  category: z.string().min(1),
  subgroup: z.string().optional().nullable(),

  source_name: z.string().min(1),
  source_url: z.string().url().optional().nullable(),
  source_method: z.string().optional().nullable(),

  title: z.string().min(1),
  summary: z.string().optional().nullable(),
  link: z.string().url(),                 // must be a valid URL
  published_iso: z.string().optional().nullable(), // keep flexible

  country_infer: z.string().optional().nullable(),
  is_SCANDI: z.union([z.string(), z.boolean()]).optional().nullable(),
  is_usa: z.union([z.string(), z.boolean()]).optional().nullable(),

  debate_score: z.union([z.string(), z.number()]).optional().nullable(),
  __base_score: z.union([z.string(), z.number()]).optional().nullable(),
  most_debated_score: z.union([z.string(), z.number()]).optional().nullable(),
  reddit_matches: z.union([z.string(), z.number()]).optional().nullable(),
}).passthrough(); // ignore unknown columns

export type WeeklyRowParsed = z.infer<typeof weeklyRowSchema>;
export const weeklyArraySchema = z.array(weeklyRowSchema);

import { z } from 'zod';

export const the5RowSchema = z.object({
  short_headline: z.string().min(1).optional(),
  title: z.string().min(1),
  summary: z.string().optional().nullable(),
  link: z.string().url().optional(),
  source_display: z.string().min(1).optional(),
  source_name: z.string().min(1).optional(),
  source_domain: z.string().min(1).optional(),
  category: z.string().min(1).optional(),
  published_iso: z.string().optional(),
  // Add any other fields your CSV provides here
}).passthrough();

export type The5Row = z.infer<typeof the5RowSchema>;

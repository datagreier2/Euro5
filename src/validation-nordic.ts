import { z } from 'zod';

export const nordicPickRowSchema = z.object({
  title: z.string().min(1),
  summary: z.string().optional().nullable(),
  link: z.string().url().optional(),
  source_name: z.string().min(1).optional(),
  source_url: z.string().url().optional().nullable(),
  category: z.string().min(1).optional(),
  secondary_category: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  published_iso: z.string().optional().nullable(),
}).passthrough();

export type NordicPickRow = z.infer<typeof nordicPickRowSchema>;

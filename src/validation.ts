import { z } from 'zod';

export const weeklyRowSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().optional().nullable(),
  link: z.string().url(),
  source: z.string().min(1),
  category: z.string().min(1),
  subgroup: z.string().optional().nullable(),
  published_iso: z.string().optional().nullable(),
});

export const weeklyArraySchema = z.array(weeklyRowSchema);
export type WeeklyRowParsed = z.infer<typeof weeklyRowSchema>;

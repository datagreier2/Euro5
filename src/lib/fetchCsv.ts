import Papa from 'papaparse';
import { ZodSchema } from 'zod';
import { weeklyRowSchema } from '../validation'; // your weekly schema
import type { WeeklyRow } from '../types';

const DEFAULT_TIMEOUT_MS = 15000;

export class CsvError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'CsvError';
  }
}

// Generic CSV + schema
export async function fetchCSVWithSchema<T extends Record<string, unknown>>(
  url: string,
  schema: ZodSchema<T>,
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<T[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
  } catch (err) {
    clearTimeout(timer);
    if ((err as any)?.name === 'AbortError')
      throw new CsvError(`Timed out after ${timeoutMs / 1000}s fetching CSV.`, err);
    throw new CsvError(`Network error: ${(err as Error).message}`, err);
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) throw new CsvError(`Failed to fetch CSV. HTTP ${res.status} ${res.statusText}`);

  const text = await res.text();
  if (!text.trim()) return [];

  const { data, errors } = Papa.parse<Record<string, unknown>>(text, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
    transform: (v) => (typeof v === 'string' ? v.trim() : v),
  });

  if (errors?.length) {
    const preview = errors.slice(0, 3).map(e => `${e.type} at row ${e.row}: ${e.message}`).join(' | ');
    throw new CsvError(`CSV parse errors: ${preview}`);
  }

  const valid: T[] = [];
  let invalid = 0;
  for (let i = 0; i < data.length; i++) {
    const parsed = schema.safeParse(data[i]);
    if (parsed.success) valid.push(parsed.data);
    else {
      invalid++;
      if (invalid === 1) {
        const first = parsed.error.issues[0];
        console.warn(`CSV row ${i + 2} dropped: ${first?.path?.join('.') ?? 'unknown'} — ${first?.message}`);
      }
    }
  }

  if (data.length > 0 && valid.length === 0) {
    throw new CsvError(`CSV validation failed: 0/${data.length} valid rows.`);
  }
  if (invalid > 0) console.warn(`CSV: skipped ${invalid} invalid row(s), kept ${valid.length}.`);

  return valid;
}

// Existing weekly wrapper (still works)
export async function fetchCSV(url: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<WeeklyRow[]> {
  return fetchCSVWithSchema<WeeklyRow>(url, weeklyRowSchema, timeoutMs);
}

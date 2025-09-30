// src/lib/fetchCsv.ts
import Papa from 'papaparse';
import { weeklyRowSchema } from '../validation';
import type { WeeklyRow } from '../types';

const DEFAULT_TIMEOUT_MS = 15000;

export class CsvError extends Error {
  constructor(message: string, public cause?: unknown) {
    super(message);
    this.name = 'CsvError';
  }
}

export async function fetchCSV(url: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<WeeklyRow[]> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
  } catch (err) {
    clearTimeout(timer);
    if ((err as any)?.name === 'AbortError') throw new CsvError(`Timed out after ${timeoutMs / 1000}s fetching CSV.`, err);
    throw new CsvError(`Network error: ${(err as Error).message}`, err);
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) throw new CsvError(`Failed to fetch CSV. HTTP ${res.status} ${res.statusText}`);

  const text = await res.text();
  if (!text.trim()) return [];

  const { data, errors, meta } = Papa.parse<WeeklyRow>(text, {
    header: true,
    skipEmptyLines: 'greedy',
    transformHeader: (h) => h.trim(),
    transform: (v) => (typeof v === 'string' ? v.trim() : v),
  });

  if (errors?.length) {
    const preview = errors.slice(0, 3).map(e => `${e.type} at row ${e.row}: ${e.message}`).join(' | ');
    throw new CsvError(`CSV parse errors: ${preview}`);
  }

  // Ensure required columns exist in the header row
  const required = ['title', 'link', 'source_name', 'category'];
  const cols = meta.fields || [];
  const missing = required.filter(r => !cols.includes(r));
  if (missing.length) {
    throw new CsvError(`CSV is missing required columns: ${missing.join(', ')}`);
  }

  // Validate rows individually; keep valid ones, skip bad ones (graceful)
  const valid: WeeklyRow[] = [];
  let invalidCount = 0;
  data.forEach((row, idx) => {
    const parsed = weeklyRowSchema.safeParse(row);
    if (parsed.success) {
      valid.push(parsed.data);
    } else {
      invalidCount += 1;
      // Optional: surface the first issue to console to help debugging during dev
      if (invalidCount === 1) {
        const first = parsed.error.issues[0];
        console.warn(`CSV row ${idx + 2} dropped: ${first?.path?.join('.') ?? 'unknown'} — ${first?.message}`);
      }
    }
  });

  if (data.length > 0 && valid.length === 0) {
    throw new CsvError(`CSV validation failed: 0/${data.length} valid rows. Check header names and row values.`);
  }
  if (invalidCount > 0) {
    console.warn(`CSV: skipped ${invalidCount} invalid row(s), kept ${valid.length}.`);
  }

  return valid;
}

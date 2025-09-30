import Papa from 'papaparse';
import { weeklyArraySchema } from '../validation';
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
  const t = setTimeout(() => controller.abort(), timeoutMs);

  let res: Response;
  try {
    res = await fetch(url, { signal: controller.signal, cache: 'no-store' });
  } catch (err) {
    clearTimeout(t);
    if ((err as any)?.name === 'AbortError') throw new CsvError(`Timed out after ${timeoutMs / 1000}s fetching CSV.`, err);
    throw new CsvError(`Network error fetching CSV: ${(err as Error).message}`, err);
  } finally {
    clearTimeout(t);
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

  const required = ['id','title','link','source','category'];
  const cols = meta.fields || [];
  const missing = required.filter(r => !cols.includes(r));
  if (missing.length) throw new CsvError(`CSV missing required columns: ${missing.join(', ')}`);

  const parsed = weeklyArraySchema.safeParse(data);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    throw new CsvError(`CSV validation failed at ${first?.path?.join('.') || 'unknown'} — ${first?.message}`);
  }

  return parsed.data;
}

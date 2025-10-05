const GRAPHICS_BASE_URL = `${import.meta.env.BASE_URL}data/europe_map_graphics`;

/**
 * Builds an absolute URL for a country's map graphic stored under public/data.
 * Returns null when the provided country code is missing or empty.
 */
export function resolveCountryGraphic(country?: string | null): string | null {
  if (!country) return null;

  const key = country.trim().toLowerCase();
  if (!key) return null;

  return `${GRAPHICS_BASE_URL}/${encodeURIComponent(key)}/vector.svg`;
}

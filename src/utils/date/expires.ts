export type Expires = 'EXPIRED' | 'SOON' | 'LATER' | 'NEVER' | 'UNKNOWN';

/**
 * Returns the expiry status of a date.
 *
 * @param date - The date to check (string or Date).
 * @param days - Time in days before expiry to consider as "SOON".
 * @returns 'EXPIRED', 'SOON', 'LATER', 'NEVER', or 'UNKNOWN'.
 */
export function expires(date: string | Date, days = 7): Expires {
  const now = Date.now();
  const target = typeof date === 'string' ? new Date(date) : new Date(date);
  if (Number.isNaN(target.getTime())) return 'UNKNOWN';

  if (target.getFullYear() >= 9999) return 'NEVER';

  const expiringThresholdMs = days * 24 * 60 * 60 * 1000;
  const diff = target.getTime() - now;
  if (diff <= 0) return 'EXPIRED';
  if (diff <= expiringThresholdMs) return 'SOON';
  return 'LATER';
}

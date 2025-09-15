import { timeDiff } from './timeDiff';

export type TimeUnit = 'YEAR' | 'MONTH' | 'WEEK' | 'DAY' | 'HOUR' | 'MINUTE' | 'SECOND' | 'INVALID_DATE';
export type TimeResult = { unit: TimeUnit; value: number };

let defaultUnits: TimeUnit[] = ['YEAR', 'MONTH', 'WEEK', 'DAY', 'HOUR', 'MINUTE', 'SECOND'];

/**
 * Calculates the remaining time until a target date.
 *
 * @example
 * ```ts
 * timeLapse(new Date(Date.now() + 1000 * 60 * 60 * 24 * 5)); // { value: 5, unit: 'DAY' }
 * timeLapse(new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), 'past'); // { value: 3, unit: 'DAY' }
 * timeLapse(new Date(Date.now() + 1000 * 60 * 60 * 24 * 31)); // { value: 1, unit: 'MONTH' }
 * timeLapse(new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)); // { value: 1, unit: 'YEAR' }
 * ```
 *
 * @param date - The target date (Date object or ISO string).
 * @param allowedUnits - (optional) array of units to filter the result. If provided, only these units will be considered.
 *
 * @returns An object containing the remaining time and its unit ('DAY', 'HOUR', or 'MINUTE').
 */
export function timeLapse(date: Date | string, allowedUnits: TimeUnit[] = defaultUnits): TimeResult {
  return timeDiff(new Date(), date, allowedUnits);
}

timeLapse.defaultUnits = (units: TimeUnit[]) => {
  defaultUnits = units;
};

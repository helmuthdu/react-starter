import { Logger } from '../logger.util';
import type { Fn } from '../types';
import { predict } from './predict';
import { retry } from './retry';

type AttemptOptions = {
  identifier?: string;
  retries?: number;
  silent?: boolean;
  timeout?: number;
};

/**
 * Attempts to execute a function with advanced error handling and retry logic.
 *
 * @example
 * ```ts
 * const unreliableFunction = async () => {
 *   if (Math.random() < 0.7) throw new Error('Random failure');
 *   return 'Success!';
 * };
 *
 * await attempt(
 *   unreliableFunction,
 *   { retries: 3, silent: false, timeout: 5000 },
 * ); // Success! (or undefined if all attempts failed)
 * ```
 *
 * @param fn - The function to be executed.
 * @param [options] - Configuration options for the attempt.
 * @param [options.identifier] - Custom identifier for logging purposes.
 * @param [options.retries=0] - Number of retry attempts if the function fails.
 * @param [options.silent=false] - If true, suppresses error logging.
 * @param [options.timeout=7000] - Timeout in milliseconds for function execution.
 *
 * @returns A tuple containing the result of the function or undefined if it failed, and an error object if applicable.
 */
export async function attempt<T extends Fn, R = Awaited<ReturnType<T>>>(
  fn: T,
  { silent = false, retries = 0, timeout = 7000, identifier = fn.name || 'anonymous function' }: AttemptOptions = {},
): Promise<[R | undefined, Error | undefined]> {
  try {
    return [await retry(() => predict<R>(() => fn(), { timeout }), { times: retries + 1 }), undefined];
  } catch (err) {
    if (!silent) {
      Logger.error(`attempt(${identifier}) -> all attempts failed`, { cause: err });
    }

    const error = err instanceof Error ? err : new Error(String(err));
    return [undefined, error];
  }
}

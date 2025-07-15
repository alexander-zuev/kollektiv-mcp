/**
 * A union of the most common date‐like inputs we need to handle.
 *
 * • string  – ISO-8601 or any browser-parsable date string
 * • number  – milliseconds since epoch (a JS timestamp)
 * • Date    – a plain `Date` instance
 */
export type DateInput = string | number | Date;

/**
 * Normalises any supported {@link DateInput} to a valid `Date` instance.
 * Throws an error if the input cannot be converted to a valid date.
 *
 * @internal
 */
const toDate = (input: DateInput): Date => {
  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) {
    throw new TypeError(
      `Invalid date input: ${JSON.stringify(input)} – expected ISO string, epoch millis, or Date`
    );
  }

  return date;
};

/**
 * Formats a date into a long, human-readable form, e.g.
 * `April 24, 2025 10:18 PM`.
 *
 * @param input - Any supported {@link DateInput}. Most commonly an ISO-8601 string
 *                (`2025-04-24T22:18:12Z`) or a JavaScript timestamp (number).
 * @param locale - BCP47 locale tag used by `Intl.DateTimeFormat` (default: `'en-US'`).
 *
 * @returns A string such as `April 24, 2025 10:18 PM`.
 */
export const formatLongDate = (input: DateInput, locale: string = 'en-US'): string => {
  const date = toDate(input);

  const datePart = date.toLocaleDateString(locale, {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const timePart = date.toLocaleTimeString(locale, {
    hour: 'numeric',
    minute: '2-digit',
  });

  return `${datePart} ${timePart}`;
};

/**
 * Quickly obtain a short, numeric date representation in the form `YYYY-MM-DD`.
 *
 * Useful for filenames, API payloads, compact UI, etc.
 *
 * @example
 * ```ts
 * formatShortDate('2025-04-24T22:18:12Z'); // → '2025-04-24'
 * ```
 *
 * @param input - Any supported {@link DateInput}.
 * @returns A string formatted as `YYYY-MM-DD`.
 */
export const formatShortDate = (input: DateInput): string => {
  const date = toDate(input);

  return date.toISOString().slice(0, 10); // first 10 chars of ISO string
};

/**
 * Converts a date into a Unix timestamp.
 *
 * @param input  - Any supported {@link DateInput}.
 * @param inSeconds - When `true`, returns seconds since epoch (default: `false`,
 *                    which returns milliseconds).
 *
 * @example
 * ```ts
 * toUnixTimestamp(new Date());        // → 1713928745123
 * toUnixTimestamp('2025-04-24', true) // → 1745520000
 * ```
 */
export const toUnixTimestamp = (input: DateInput, inSeconds: boolean = false): number => {
  const millis = toDate(input).getTime();
  return inSeconds ? Math.floor(millis / 1000) : millis;
};
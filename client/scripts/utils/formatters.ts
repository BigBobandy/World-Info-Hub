/**
 * Formats an area number as a string with local number formatting.
 *
 * @param {number} num The area number to format.
 * @return {string} The formatted area number as a string.
 */
export function formatArea(num: number | null | undefined): string {
  if (num === null || num === undefined) {
    return "Not available"; // Or some other placeholder text
  }
  // Use toLocaleString to format it
  return num.toLocaleString();
}

/**
 * Converts a large number into a shortened format, e.g., "17 Billion".
 *
 * @param {number | bigint | null | undefined} num The large number to format.
 * @return {string} The formatted large number as a string.
 */
export function formatLargeNumber(
  num: number | bigint | null | undefined
): string {
  if (num === null || num === undefined) {
    return "Not available";
  }

  const number = Number(num); // Convert bigint to number, which is safe for world population sizes

  // Billion
  if (number >= 1_000_000_000) {
    return (number / 1_000_000_000).toFixed(1) + " Billion";
  }
  // Million
  else if (number >= 1_000_000) {
    return (number / 1_000_000).toFixed(1) + " Million";
  }
  // Thousand
  else if (number >= 1_000) {
    return (number / 1_000).toFixed(1) + " Thousand";
  }
  // Less than thousand
  return number.toLocaleString();
}

/**
 * Formats a number as a string with local number formatting.
 *
 * @param {number | string} num The number to format.
 * @return {string} The formatted number as a string.
 */
export function formatPopulation(num) {
    // Ensure this is a number, then use toLocaleString to format it
    return num.toLocaleString();
}
/**
 * Formats an area number as a string with local number formatting.
 *
 * @param {number} num The area number to format.
 * @return {string} The formatted area number as a string.
 */
export function formatArea(num) {
    if (num === null || num === undefined) {
        return "Not available"; // Or some other placeholder text
    }
    // Use toLocaleString to format it
    return num.toLocaleString();
}

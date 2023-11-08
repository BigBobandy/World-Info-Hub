/**
 * Represents the keys used for filtering countries.
 * @typedef {('searchTerm' | 'region' | 'misc')} FilterKeys
 */
type FilterKeys = "searchTerm" | "region" | "misc";

/**
 * Holds the current state of all filters applied to the country list.
 * @type {{ [key in FilterKeys]: string }}
 */
export let currentFilters: {
  [key in FilterKeys]: string;
} = {
  searchTerm: "",
  region: "All",
  misc: "All",
};

/**
 * Updates the current filter state with new values for the specified filter type.
 * @param {FilterKeys} filterType - The type of filter to update ('searchTerm', 'region', or 'misc').
 * @param {string} value - The new value for the specified filter type.
 */
export function updateFilterState(filterType: FilterKeys, value: string) {
  currentFilters[filterType] = value;
}

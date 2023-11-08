import { Country } from "../types/country.js";

/**
 * Filters countries based on a search term.
 * It performs a case-insensitive search for the country name.
 *
 * @param {Country[]} countries - The array of countries to filter.
 * @param {string} searchTerm - The search term to filter the countries by.
 * @return {Country[]} An array of countries that match the search term.
 */
export function filterCountriesBySearchTerm(
  countries: Country[],
  searchTerm: string
): Country[] {
  if (!searchTerm) {
    return countries;
  }

  const lowerCaseSearchTerm = searchTerm.toLowerCase();

  return countries.filter((country) =>
    country.name.toLowerCase().includes(lowerCaseSearchTerm)
  );
}

/**
 * Updates the text content of the country counter element with the current number of countries.
 * It correctly handles singular and plural forms based on the count provided.
 *
 * @param {number} count The number of countries to display in the counter.
 */
export function updateCountryCounter(count: number) {
  const countryCounterElement = document.getElementById("country-counter");

  if (countryCounterElement) {
    countryCounterElement.textContent = `${count} ${
      count === 1 ? "Country" : "Countries"
    }`;
  }
}

/**
 * Populates the region filter dropdown with unique region options.
 *
 * @param {Country[]} countries An array of all country objects.
 */
export function populateRegionFilter(countries: Country[]): void {
  const regionSet = new Set<string>();
  countries.forEach((country) => {
    if (country.region) regionSet.add(country.region);
  });

  const regionFilter = document.getElementById(
    "region-filter"
  ) as HTMLSelectElement;
  if (!regionFilter) {
    console.error("Region filter element not found");
    return;
  }

  regionSet.forEach((region) => {
    const option = document.createElement("option");
    option.value = region;
    option.textContent = region;
    regionFilter.appendChild(option);
  });
}

/**
 * Filters countries by the selected region.
 *
 * @param {Country[]} countries An array of all country objects.
 * @param {string} selectedRegion The selected region to filter by.
 * @return {Country[]} The filtered array of countries.
 */
export function filterCountriesByRegion(
  countries: Country[],
  selectedRegion: string
): Country[] {
  if (selectedRegion === "All") {
    return countries;
  }

  return countries.filter((country) => country.region === selectedRegion);
}

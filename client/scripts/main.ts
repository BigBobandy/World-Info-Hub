import { generateCountryCards } from "./components/countryCards.js";
import { initializeSearchBar } from "./components/searchBar.js";
import { fetchCountries } from "./services/countryService.js";
import { currentFilters, updateFilterState } from "./state/filterState.js";
import { ExtendedCountry } from "./types/country.js";
import {
  filterCountriesByRegion,
  filterCountriesBySearchTerm,
  populateRegionFilter,
  updateCountryCounter,
} from "./utils/filters.js";
import { sortCountries } from "./utils/miscFilters.js";
import { processCountries } from "./utils/processCountries.js";

let allCountries: ExtendedCountry[] = [];

/**
 * Applies all active filters to the country list and updates the display.
 */
function applyFilters() {
  let filteredCountries = filterCountriesBySearchTerm(
    allCountries,
    currentFilters.searchTerm
  );
  filteredCountries = filterCountriesByRegion(
    filteredCountries,
    currentFilters.region
  );
  // If a misc filter is selected, apply it as well
  if (currentFilters.misc !== "All") {
    filteredCountries = sortCountries(filteredCountries, currentFilters.misc);
  }
  generateCountryCards(filteredCountries);
  updateCountryCounter(filteredCountries.length);
}

/**
 * The main entry point for the application which sets up event listeners
 * and initializes the application state after the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    let fetchedCountries = await fetchCountries();
    allCountries = processCountries(fetchedCountries);
    populateRegionFilter(allCountries);
    generateCountryCards(allCountries);
    updateCountryCounter(allCountries.length);

    // Initialize search bar with a callback that filters and displays countries
    initializeSearchBar((searchTerm: string) => {
      updateFilterState("searchTerm", searchTerm);
      applyFilters();
    });

    // Set up event listener for the region filter
    const regionFilter = document.getElementById(
      "region-filter"
    ) as HTMLSelectElement;
    regionFilter.addEventListener("change", () => {
      updateFilterState("region", regionFilter.value);
      applyFilters();
    });

    // Set up event listener for misc filters
    const miscFilter = document.getElementById(
      "misc-filter"
    ) as HTMLSelectElement;
    miscFilter.addEventListener("change", () => {
      updateFilterState("misc", miscFilter.value);
      applyFilters();
    });
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
});

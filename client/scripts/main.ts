import { generateCountryCards } from "./components/countryCards.js";
import { initializeSearchBar } from "./components/searchBar.js";
import { fetchCountries } from "./services/countryService.js";
import { Country } from "./types/country.js";
import {
  filterCountriesBySearchTerm,
  updateCountryCounter,
} from "./utils/filters.js";

let allCountries: Country[] = []; // This will store all fetched countries

document.addEventListener("DOMContentLoaded", async () => {
  try {
    allCountries = await fetchCountries();
    generateCountryCards(allCountries);

    // Initialize search bar with a callback that filters and displays countries
    initializeSearchBar((searchTerm: string) => {
      const filteredCountries = filterCountriesBySearchTerm(
        allCountries,
        searchTerm
      );
      generateCountryCards(filteredCountries);
      updateCountryCounter(filteredCountries.length);
    });
    // Further actions to display countries in the UI
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
});

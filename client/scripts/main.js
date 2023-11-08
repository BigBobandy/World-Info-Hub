import { generateCountryCards } from "./components/countryCards.js";
import { initializeSearchBar } from "./components/searchBar.js";
import { fetchCountries } from "./services/countryService.js";
import { filterCountriesByRegion, filterCountriesBySearchTerm, populateRegionFilter, updateCountryCounter, } from "./utils/filters.js";
import { sortCountries } from "./utils/miscFilters.js";
import { processCountries } from "./utils/processCountries.js";
let allCountries = []; // This will store all fetched countries
/**
 * The main entry point for the application which sets up event listeners
 * and initializes the application state after the DOM content is loaded.
 */
document.addEventListener("DOMContentLoaded", async () => {
    try {
        let fetchedCountries = await fetchCountries();
        // Process the fetched countries to calculate and add gdpPerCapita
        allCountries = processCountries(fetchedCountries);
        populateRegionFilter(allCountries);
        generateCountryCards(allCountries);
        console.log("All countries after fetching: ", allCountries);
        // Initialize search bar with a callback that filters and displays countries
        initializeSearchBar((searchTerm) => {
            const filteredCountries = filterCountriesBySearchTerm(allCountries, searchTerm);
            generateCountryCards(filteredCountries);
            updateCountryCounter(filteredCountries.length);
        });
        // Set up event listener for the region filter
        const regionFilter = document.getElementById("region-filter");
        regionFilter.addEventListener("change", () => {
            const selectedRegion = regionFilter.value;
            const filteredCountries = filterCountriesByRegion(allCountries, selectedRegion);
            generateCountryCards(filteredCountries);
            updateCountryCounter(filteredCountries.length);
        });
        // Set up event listener for misc filters
        const miscFilter = document.getElementById("misc-filter");
        miscFilter.addEventListener("change", () => {
            const selectedCriterion = miscFilter.value;
            const sortedAndFilteredCountries = sortCountries(allCountries, selectedCriterion);
            generateCountryCards(sortedAndFilteredCountries);
            updateCountryCounter(sortedAndFilteredCountries.length);
        });
    }
    catch (error) {
        console.error("Error fetching countries:", error);
    }
});

import { generateCountryCards } from "./components/countryCards.js";
import { initializeSearchBar } from "./components/searchBar.js";
import { fetchCountries } from "./services/countryService.js";
import { filterCountriesByRegion, filterCountriesBySearchTerm, populateRegionFilter, updateCountryCounter, } from "./utils/filters.js";
import { sortCountries } from "./utils/miscFilters.js";
let allCountries = []; // This will store all fetched countries
document.addEventListener("DOMContentLoaded", async () => {
    try {
        allCountries = await fetchCountries();
        populateRegionFilter(allCountries);
        generateCountryCards(allCountries);
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

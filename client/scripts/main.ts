import { generateCountryCards } from "./components/countryCards.js";
import { fetchCountries } from "./services/countryService.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const countries = await fetchCountries();
    console.log(countries);

    generateCountryCards(countries);

    // Further actions to display countries in the UI
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
});

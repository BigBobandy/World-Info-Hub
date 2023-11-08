import { Country } from "../types/country.js";
import { updateCountryCounter } from "../utils/filters.js";
import {
  formatArea,
  formatLargeNumber,
  formatPopulation,
} from "../utils/formatters.js";

/**
 * Generates country cards for each country in the array and updates the display.
 *
 * @param {Country[]} countries An array of country objects to display.
 */
export function generateCountryCards(countries: Country[]) {
  const gridContainer = document.querySelector(".grid-container");

  if (!gridContainer) {
    console.error("Main element not found");
    return;
  }

  // Clear any existing content in the main element
  gridContainer.innerHTML = "";

  // Iterate over the array of countries and generate cards
  countries.forEach((country) => {
    const card = document.createElement("div");
    card.classList.add("country-card");

    // Use the imported formatter functions
    const formattedPopulation = formatPopulation(country.population);
    const formattedArea = formatArea(country.area);
    // Construct the card content
    let cardContent = `
      <div class="country-flag-container">
        <img src="${country.flag}" alt="Flag of ${country.name}" class="country-flag" />
      </div>
      <div class="country-details">
        <h2 class="country-name">${country.name}</h2>
        <p class="country-capital"><strong>Capital:</strong> ${country.capital}</p>
        <p class="country-region"><strong>Region:</strong> ${country.region} (${country.subregion})</p>
        <p class="country-population"><strong>Population:</strong> ${formattedPopulation}</p>
        <p class="country-area"><strong>Area:</strong> ${formattedArea} km²</p>
    `;

    // Conditionally add GDP and GDP Per Capita
    if (country.gdp) {
      const formattedGdp = formatLargeNumber(country.gdp);
      cardContent += `<p class="country-gdp"><strong>GDP:</strong> ${formattedGdp}</p>`;
    }
    if (country.gdp && country.population) {
      const formattedGdpPerCapita = formatLargeNumber(
        country.gdp / Number(country.population)
      );
      cardContent += `<p class="country-gdp-percapita"><strong>GDP Per Capita:</strong> ${formattedGdpPerCapita}</p>`;
    }

    // Close the country-details div
    cardContent += `</div>`;

    // Set the inner HTML of the card
    card.innerHTML = cardContent;

    // Append the card to the main element
    gridContainer.appendChild(card);
  });

  // After appending all country cards to the grid, update the counter
  updateCountryCounter(countries.length);
}

import { formatArea, formatPopulation } from "../utils/formatters.js";
// Function that generates a country card
export function generateCountryCards(countries) {
    const gridContainer = document.querySelector(".grid-container");
    console.log("hello");
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
        // Create the card content based on the country data
        card.innerHTML = `
    <div class="country-flag-container">
      <img src="${country.flag}" alt="Flag of ${country.name}" class="country-flag" />
    </div>
    <div class="country-details">
      <h2 class="country-name">${country.name}</h2>
      <p class="country-capital"><strong>Capital:</strong> ${country.capital}</p>
      <p class="country-region"><strong>Region:</strong> ${country.region} (${country.subregion})</p>
      <p class="country-population"><strong>Population:</strong> ${formattedPopulation}</p>
      <p class="country-area"><strong>Area:</strong> ${formattedArea} km²</p>
    </div>
  `;
        // Append the card to the main element
        gridContainer.appendChild(card);
    });
}

const main = document.getElementById("main");
const form = document.getElementById("form");
const searchBar = document.getElementById("search-bar");

// API URL to fetch country data
const API_URL = "https://restcountries.com/v3.1/all";

// Call getCountries() function to start fetching data
getCountries(API_URL);

// Function to fetch country data from the API
async function getCountries(url) {
  // Fetch data from the API URL
  const result = await fetch(url);
  // Parse the fetched data as JSON
  const data = await result.json();

  // Call showCountries() function to display the country data on the page
  showCountries(data);
}

// Function to display country data on the page
function showCountries(countries) {
  // Clear the content of the main element
  main.innerHTML = "";

  // Loop through each country in the countries array
  countries.forEach((country) => {
    // Extracting properties from the country object
    const { name, population, languages, cca2 } = country;
    // Construct the flag image URL using the country code
    const flagImageUrl = `https://flagcdn.com/64x48/${cca2.toLowerCase()}.png`;

    // Get the common name from the name object
    const commonName = name.common;

    // Get the primary language
    const primaryLanguage =
      languages && Object.values(languages)[0]
        ? Object.values(languages)[0]
        : "Unknown";

    // Get the primary currency
    const primaryCurrency =
      country.currencies && Object.values(country.currencies)[0]
        ? `${Object.values(country.currencies)[0].name} (${
            Object.values(country.currencies)[0].symbol
          })`
        : "Unknown";

    // Create a new div element for the country card
    const countryEl = document.createElement("div");
    // Add the 'country-card' class to the div element
    countryEl.classList.add("country-card");

    // Set the inner HTML of the country card with the country data
    countryEl.innerHTML = `<img src="${flagImageUrl}" alt="${commonName} Flag" class="country-flag" />
      <div class="country-details">
        <h3 class="country-title">${commonName}</h3>
        <h4 class="country-population">
          Population: <span class="population-number">${population}</span>
        </h4>
        <h4 class="country-language">
          Language: <span class="language-name">${primaryLanguage}</span>
        </h4>
        <h4 class="country-currency">
          Currency: <span class="currency-code">${primaryCurrency}</span>
        </h4>
        <h4 class="country-gdp">GDP: <span class="gdp">23 Trillion</span></h4>
      </div>`;

    // Append the country card to the main element
    main.appendChild(countryEl);
  });
}

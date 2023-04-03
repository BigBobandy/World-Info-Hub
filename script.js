const main = document.getElementById("main");
const form = document.getElementById("form");
const searchBar = document.getElementById("search-bar");

// API URL to fetch country data
const API_URL = "https://restcountries.com/v3.1/all";

// Add an event listener to the form element to handle the search input
form.addEventListener("submit", (e) => {
  // Prevent the form from being submitted and refreshing the page
  e.preventDefault();

  // Get the search input value and trim any extra whitespace
  const searchTerm = searchBar.value.trim();

  // If there's a search term, filter the countries and display the results
  if (searchTerm) {
    filterCountries(searchTerm);
  } else {
    // If there's no search term, display all countries
    getCountries(API_URL);
  }
});

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

async function fetchGDPForCountry(countryCode) {
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&per_page=1`;
  const result = await fetch(url);
  const data = await result.json();

  return data[1] && data[1][0] && data[1][0].value;
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
        : "No Data Available";

    // Get the primary currency
    // Check if the country object has the 'currencies' property and there's at least one currency available
    const primaryCurrency =
      country.currencies && Object.values(country.currencies)[0]
        ? `${Object.values(country.currencies)[0].name} (${
        ? // If there's at least one currency available, use a template literal to create a formatted string
          `${Object.values(country.currencies)[0].name} (${
            Object.values(country.currencies)[0].symbol
          })`
        : "Unknown";
        : // If there's no currency data available, set the primaryCurrency variable to "No Data Available"
          "No Data Available";

    // Format population with commas
    const formattedPopulation = population.toLocaleString();

    // Fetch and display GDP for the country
    fetchGDPForCountry(cca2).then((gdpValue) => {
      const gdpElement = countryEl.querySelector(".gdp");
      gdpElement.textContent = gdpValue
        ? formatLargeNumber(gdpValue)
        : "No Data Available";
    });

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
          Population: <span class="population-number">${formattedPopulation}</span>
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

// Function to filter countries based on search input
async function filterCountries(searchTerm) {
  // Fetch all countries
  const result = await fetch(API_URL);
  const countries = await result.json();

  // Filter the countries based on the search term
  const filteredCountries = countries.filter((country) => {
    // Check if the country name includes the search term (case-insensitive)
    return country.name.common.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Display the filtered countries
  showCountries(filteredCountries);
}

// Function to format large numbers making them more readable
function formatLargeNumber(num) {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(2) + " trillion";
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(2) + " billion";
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(2) + " million";
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(2) + " thousand";
  }
  return num;
}

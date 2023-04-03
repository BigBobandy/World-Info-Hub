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

// Add event listener for input event on the search bar
searchBar.addEventListener("input", (event) => {
  handleSearch(event);
  transitionCards();
});

// Store the fetched countries data in a variable
let countriesData = [];

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

  // Store the fetched data in countriesData variable
  countriesData = data;
}

// Async function that takes country code as an argument and finds the gdp of the country using an API
async function fetchGDPForCountry(countryCode) {
  // fetch GDP data from the World Bank API
  const url = `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.CD?format=json&per_page=1`;

  // Await the fetch() function to get the data from the API URL
  const result = await fetch(url);
  // Await the result.json() function to parse the fetched data as JSON
  const data = await result.json();

  // Check if the data array has a second element, and if that element has a first element, and if that first element has a 'value' property
  // If all these conditions are true, return the 'value' property (which represents the GDP value)
  // If any of these conditions are false, return undefined
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
        : "No Data Available";

    // Check if the country object has the 'currencies' property and there's at least one currency available
    const primaryCurrency =
      country.currencies && Object.values(country.currencies)[0]
        ? // If there's at least one currency available, use a template literal to create a formatted string
          `${Object.values(country.currencies)[0].name} (${
            Object.values(country.currencies)[0].symbol
          })`
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

// Function to handle search input
function handleSearch(event) {
  // Get the search term from the input field
  const searchTerm = event.target.value.trim();

  // If the search term is not empty, filter the countries based on the search term
  if (searchTerm) {
    const filteredCountries = countriesData.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    showCountries(filteredCountries);
  } else {
    // If the search term is empty, display all countries
    showCountries(countriesData);
  }
}

// Function to smoothly transition country cards during search
function transitionCards() {
  // Get the search term from the search bar, trim whitespace, and convert it to lowercase
  const searchTerm = searchBar.value.trim().toLowerCase();

  // Select all the country cards on the page
  const countryCards = document.querySelectorAll(".country-card");

  // Loop through each country card
  countryCards.forEach((countryCard) => {
    // Get the country title text from the country card and convert it to lowercase
    const countryTitle = countryCard
      .querySelector(".country-title")
      .textContent.toLowerCase();

    // Check if the country title includes the search term
    if (countryTitle.includes(searchTerm)) {
      // If the search term matches, remove the 'filtered' class
      countryCard.classList.remove("filtered");
    } else {
      // If the search term doesn't match, add the 'filtered' class
      countryCard.classList.add("filtered");
    }
  });
}

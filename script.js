const main = document.getElementById("main");
const form = document.getElementById("form");
const searchBar = document.getElementById("search-bar");
const regionFilter = document.getElementById("region-filter");
const miscFilter = document.getElementById("misc-filter");

// API URL to fetch country data
const API_URL = "https://restcountries.com/v3.1/all";

// Event listener to the form element to handle the search input
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

// Event listener for input event on the search bar
searchBar.addEventListener("input", (event) => {
  handleSearch(event);
  transitionCards();
});

// Event listener for the filter by region menu
regionFilter.addEventListener("change", filterByRegionAndMisc);

miscFilter.addEventListener("change", filterByRegionAndMisc);

// Store the fetched countries data in an empty array
let countriesData = [];

// Call getCountries() function to start fetching data
getCountries(API_URL).then(() => {
  // Once the data has been fetched and stored in countriesData,
  // call the populateRegionFilter() function to populate the dropdown menu
  populateRegionFilter();
});

// Function to fetch country data from the API
async function getCountries(url) {
  // Fetch data from the API URL
  const result = await fetch(url);
  // Parse the fetched data as JSON
  const data = await result.json();

  // Store the fetched data in countriesData array so that the api fetch request only occurs once
  countriesData = data;
  console.log(countriesData);

  // Filter and sort countries before displaying them
  filterByRegionAndMisc();

  // Call showCountries() function to display the country data on the page
  showCountries(data);
}

// Async function that takes country code as an argument and finds the gdp of the country using an API
async function fetchGDPForCountry(countryCode) {
  // fetch GDP data by passing the country code to the World Bank API
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

  // Update the country counter with the number of countries being displayed by passing the current number of country cards to the function
  updateCountryCounter(countries.length);

  // Loop through each country in the countries array
  countries.forEach((country) => {
    // Extracting properties from the country object
    const { name, population, languages, cca2 } = country;
    // Construct the flag image URL using the country code
    const flagImageUrl = `https://flagcdn.com/64x48/${cca2.toLowerCase()}.png`;

    // Get the common name and official from the name object
    const commonName = name.common;
    const officialName = name.official;

    // Get the primary language
    const primaryLanguage =
      //Checks if the languages object exists and has atleast one value
      languages && Object.values(languages)[0]
        ? //If the languages both exists and has atleast one value then Object.values(laguages)[0] is assigned to the variable
          Object.values(languages)[0]
        : //Else this string is assigned to the variable
          "No Data Available";

    // Check if the country object has the 'currencies' property and there's at least one currency available
    const primaryCurrency =
      country.currencies && Object.values(country.currencies)[0]
        ? // If there's at least one currency available, use a template literal to create a formatted string
          `${Object.values(country.currencies)[0].name} (${
            Object.values(country.currencies)[0].symbol
          })`
        : // If there's no currency data available, set the primaryCurrency variable to "No Data Available"
          "No Data Available";

    // Format population number with commas to make it more readable
    const formattedPopulation = population.toLocaleString();

    // Fetches the GDP data for a country using the cca2 code(two letter country code like 'US') once the data is fetched successfully, the callback function is called with the fetched gdpValue
    fetchGDPForCountry(cca2).then((gdpValue) => {
      // Calculate GDP per capita
      const gdpPerCapita = gdpValue / population;
      // Select the gdpElement and gdpPerCapitaElement in the country card using querySelector
      const gdpElement = countryEl.querySelector(".gdp");
      const gdpPerCapitaElement = countryEl.querySelector(".gdp-percapita");
      //Set the text content of the element based on the gdp value
      gdpElement.textContent = gdpValue
        ? //If the gdp value exists, format it using the formatLargeNumber function
          formatLargeNumber(gdpValue)
        : //Else set the text content to "No Data Available"
          "No Data Available";

      // Set the text content of the gdpPerCapitaElement based on the gdpPerCapita value
      gdpPerCapitaElement.textContent = gdpValue
        ? formatGdpPerCapita(gdpPerCapita)
        : "No Data Available";
    });

    // Create a new div element for the country card
    const countryEl = document.createElement("div");
    // Add the 'country-card' class to the div element
    countryEl.classList.add("country-card");

    // Set the inner HTML of the country card with the country data
    countryEl.innerHTML = `<img src="${flagImageUrl}" alt="${officialName} Flag" class="country-flag" />
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
        <h4 class="country-gdp">GDP: <span class="gdp">Loading...</span></h4>
        <h4 class="country-gdp-percapita">GDP Per Capita: <span class="gdp-percapita">Loading...</span></h4>
      </div>`;

    // Append the country card to the main element
    main.appendChild(countryEl);
  });
}

// Function to filter countries based on search input
function filterCountries(searchTerm) {
  // Filter the countries based on the search term
  const filteredCountries = countriesData.filter((country) => {
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

// Function to filter the countries shown by what is selected in the filter by region menu, and misc menu
function filterByRegionAndMisc() {
  // Get the selected region from the region filter
  const selectedRegion = regionFilter.value;
  // Get the selected misc filter
  const selectedMiscFilter = miscFilter.value;

  // Filter the countries based on the selected region
  const filteredCountries = countriesData.filter((country) => {
    // Check if the selected region matches the country's region or subregion
    const regionMatch =
      selectedRegion === "All" ||
      country.subregion === selectedRegion ||
      country.region === selectedRegion;

    // Return true if the country matches the selected region
    return regionMatch;
  });

  // Sort the filtered countries based on the selected misc filter
  if (selectedMiscFilter === "highest-population") {
    // Sort by descending population
    filteredCountries.sort((a, b) => b.population - a.population);
  } else if (selectedMiscFilter === "lowest-population") {
    // Sort by ascending population
    filteredCountries.sort((a, b) => a.population - b.population);
  } else {
    // Default sorting - Sort by country name in alphabetical order
    filteredCountries.sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
  }
  // Add more sorting conditions here if needed

  // Display the filtered countries using the showCountries() function
  showCountries(filteredCountries);
}
// Function to populate the region filter menu
function populateRegionFilter() {
  // Create a Set to store unique regions
  const uniqueRegions = new Set();
  // Create a Set to store unique subregions
  const uniqueSubregions = new Set();

  // Loop through each country in the countriesData array
  countriesData.forEach((country) => {
    // If the country has a region, add it to the uniqueRegions Set
    if (country.region) uniqueRegions.add(country.region);
    // If the country has a subregion, add it to the uniqueSubregions Set
    if (country.subregion) uniqueSubregions.add(country.subregion);
  });

  // Loop through each unique region
  uniqueRegions.forEach((region) => {
    // Create an option element for the dropdown menu
    const regionOption = document.createElement("option");
    // Set the value attribute of the option element to the region
    regionOption.value = region;
    // Set the inner text of the option element to the region
    regionOption.textContent = region;
    // Append the option element to the region filter dropdown menu
    regionFilter.appendChild(regionOption);
  });

  // Loop through each unique subregion
  uniqueSubregions.forEach((subregion) => {
    // Create an option element for the dropdown menu
    const subregionOption = document.createElement("option");
    // Set the value attribute of the option element to the subregion
    subregionOption.value = subregion;
    // Set the inner text of the option element to the subregion
    subregionOption.textContent = subregion;
    // Append the option element to the region filter dropdown menu
    regionFilter.appendChild(subregionOption);
  });
}

// Function that updates the counter element. It takes count as an argument which represents the number of cards currently being displayed
function updateCountryCounter(count) {
  // Assigning the counter element to a variable
  const countryCounter = document.getElementById("country-counter");

  // Add 'fade-out' class to create fade-out effect
  countryCounter.classList.add("fade-out");

  // After the fade-out animation is complete, update the text content and remove 'fade-out' class
  setTimeout(() => {
    //Checks if count is equal to one in order to make the displayed text grammatically correct
    countryCounter.textContent = `${count} ${
      count === 1 ? "Country" : "Countries"
    }`;
    countryCounter.classList.remove("fade-out");
  }, 200);
}

// This function formats gdp numbers
function formatGdpPerCapita(number) {
  // Using the Intl.NumberFormat object to format GDP numbers using the currency style and the USD currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

  // Then using the format() method of the formatter object on the GDP number. This returns a string with the appropriate symbol and thousands seperator
  return formatter.format(number);
}

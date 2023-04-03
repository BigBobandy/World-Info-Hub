const main = document.getElementById("main");
const form = document.getElementById("form");
const searchBar = document.getElementById("search-bar");

const API_URL = "https://restcountries.com/v3.1/all";

getCountries(API_URL);

async function getCountries(url) {
  const result = await fetch(url);
  const data = await result.json();

  showCountries(data);
}

function showCountries(countries) {
  main.innerHTML = "";

  countries.forEach((country) => {
    const { name, population, languages, currencies, cca2 } = country;
    const flagImageUrl = `https://flagcdn.com/64x48/${cca2.toLowerCase()}.png`;

    //Extract the common name from the name object
    const commonName = name.common;

    // Extract the first language name from the languages object
    const languageName = Object.values(languages)[0];

    // Extract the first currency from the currencies object
    const currency = Object.values(currencies)[0];
    const currencyCode = currency.code || "";
    const currencyName = currency.name;
    const currencySymbol = currency.symbol;

    const countryEl = document.createElement("div");
    countryEl.classList.add("country-card");

    countryEl.innerHTML = `<img src="${flagImageUrl}" alt="${commonName} Flag" class="country-flag" />
      <div class="country-details">
        <h3 class="country-title">${commonName}</h3>
        <h4 class="country-population">
          Population: <span class="population-number">${population}</span>
        </h4>
        <h4 class="country-language">
          Language: <span class="language-name">${languageName}</span>
        </h4>
        <h4 class="country-currency">
          Currency: <span class="currency-code">${currencyCode} (${currencyName}) ${currencySymbol}</span>
        </h4>
        <h4 class="country-gdp">GDP: <span class="gdp">23 Trillion</span></h4>
      </div>`;

    main.appendChild(countryEl);
  });
}

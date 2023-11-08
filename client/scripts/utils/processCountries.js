/**
 * Processes an array of country objects to calculate and add the GDP per capita.
 *
 * @param {ExtendedCountry[]} countries - An array of country objects to process.
 * @returns {ExtendedCountry[]} The array of countries with GDP per capita calculated.
 */
export function processCountries(countries) {
    return countries.map((country) => {
        if (country.gdp && country.population) {
            const populationNumber = Number(country.population);
            if (!isNaN(populationNumber) && populationNumber > 0) {
                country.gdpPerCapita = country.gdp / populationNumber;
            }
        }
        return country;
    });
}

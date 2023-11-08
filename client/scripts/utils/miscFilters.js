/**
 * Sorts an array of countries based on various criteria like GDP, population, etc.
 *
 * @param {ExtendedCountry[]} countries - The array of countries to sort.
 * @param {string} criterion - The criterion to sort by.
 * @return {ExtendedCountry[]} - The sorted array of countries.
 */
export function sortCountries(countries, criterion) {
    switch (criterion) {
        case "highest-gdp":
            // Filter out countries without GDP data before sorting
            const countriesWithGdpDataHigh = countries.filter((country) => country.gdp !== null && country.gdp !== undefined);
            return countriesWithGdpDataHigh.sort((a, b) => (b.gdp ?? 0) - (a.gdp ?? 0));
        case "lowest-gdp":
            // Filter out countries without GDP data before sorting
            const countriesWithGdpDataLow = countries.filter((country) => country.gdp !== null && country.gdp !== undefined);
            return countriesWithGdpDataLow.sort((a, b) => (a.gdp ?? 0) - (b.gdp ?? 0));
        case "highest-gdp-percapita":
            // Assume that gdpPerCapita has been calculated beforehand
            return countries.sort((a, b) => (b.gdpPerCapita ?? 0) - (a.gdpPerCapita ?? 0));
        case "lowest-gdp-percapita":
            // Assume that gdpPerCapita has been calculated beforehand
            return countries.sort((a, b) => (a.gdpPerCapita ?? 0) - (b.gdpPerCapita ?? 0));
        case "highest-population":
            return countries.sort((a, b) => Number(b.population) - Number(a.population));
        case "lowest-population":
            return countries.sort((a, b) => Number(a.population) - Number(b.population));
        default:
            // If the criterion is "All" or anything else, sort alphabetically
            return countries.sort((a, b) => a.name.localeCompare(b.name));
    }
}

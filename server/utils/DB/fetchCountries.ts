import { CountryData, Currency } from "../../types/serverTypes";

const REST_COUNTRIES_API = "https://restcountries.com/v3.1/all";

export const fetchCountriesData = async () => {
  try {
    const response = await fetch(REST_COUNTRIES_API);

    if (!response.ok) {
      throw new Error(`Failed to fetch countries data: ${response.status}`);
    }

    const rawData = await response.json();
    // Transform the raw data to match the CountryData type
    const transformedData: Partial<CountryData>[] = rawData.map(
      (country: any) => {
        // Transform currency data
        const currencies = Object.entries(country.currencies || {}).map(
          ([code, currency]: [string, any]) => ({
            code,
            name: currency.name as string,
          })
        );

        return {
          alpha2Code: country.cca2,
          alpha3Code: country.cca3,
          altSpellings: country.altSpellings,
          area: country.area,
          borders: country.borders,
          capital: country.capital ? country.capital[0] : undefined,
          cioc: country.cioc,
          continents: country.continents,
          demonym: country.demonyms ? country.demonyms.eng.m : undefined,
          flag: country.flags.svg,
          gini: country.gini ? Object.values(country.gini)[0] : undefined,
          latlng: country.latlng,
          name: country.name.common,
          nativeName: country.name.nativeName
            ? (Object.values(country.name.nativeName)[0] as any).common
            : country.name.common,
          numericCode: country.ccn3,
          population: country.population,
          region: country.region,
          subregion: country.subregion,
          timezones: country.timezones,
          unMember: country.unMember,
          currencies, // Add the transformed currencies here
          // gdp and gdpDate will be added after fetching from the World Bank API
        };
      }
    );
    console.log(transformedData); // Log the transformed data to verify it's correct
    return transformedData;
  } catch (error) {
    console.error("Error fetching countries data:", error);
  }
};

fetchCountriesData();

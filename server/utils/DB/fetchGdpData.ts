import { CountryData } from "../../types/serverTypes";

export const fetchGdpData = async (countryData: Partial<CountryData>) => {
  try {
    const response = await fetch(
      `https://api.worldbank.org/v2/country/${countryData.alpha2Code}/indicator/NY.GDP.MKTP.CD?format=json&per_page=1`
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch GDP data for country code: ${countryData.alpha2Code}`
      );
    }

    const gdpApiResponse = await response.json();

    // Check if the response is in the expected format with the data array present
    if (
      !gdpApiResponse ||
      !Array.isArray(gdpApiResponse[1]) ||
      gdpApiResponse[1].length === 0
    ) {
      console.error(
        `GDP data for country ${countryData.alpha2Code} is not in the expected format or is missing`
      );
      // Handle the error by skipping this country's GDP update
      return countryData;
    }

    const gdpData = gdpApiResponse[1][0];

    // Add the GDP value to the country data object. This is the actual GDP figure from the World Bank data.
    countryData.gdp = gdpData.value;

    // Convert the date string from the World Bank data to a Date object and add it to the country data object.
    // This represents the year or date when the GDP value was recorded.
    countryData.gdpDate = new Date(`${gdpData.date}-01-01`);

    console.log(
      `GDP data transformed for country code: ${countryData.alpha2Code}`
    );

    // Return the updated country data object with the new GDP information added.
    return countryData;
  } catch (error) {
    console.error(
      `Error fetching and transforming GDP data for country code: ${countryData.alpha2Code}: `,
      error
    );
    // Return the original country data without GDP information in case of an error
    return countryData;
  }
};

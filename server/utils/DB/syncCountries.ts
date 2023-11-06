import { Prisma, PrismaClient } from "@prisma/client";
import { CountryData } from "../../types/serverTypes"; // Assuming this is where CountryData type is defined
import { fetchCountriesData } from "./fetchCountries";
import { fetchGdpData } from "./fetchGdpData";

const prisma = new PrismaClient();
const findMissingCountries = async () => {
  try {
    // Fetch the latest countries data
    const fetchedCountries = await fetchCountriesData();

    // If fetchedCountries is undefined, throw an error or exit the function
    if (!fetchedCountries) {
      console.error("No countries data was fetched.");
      return; // Exit the function if there's no data
    }

    // Fetch the current countries from the database
    const dbCountries = await prisma.country.findMany();

    // Convert the database countries to a map for easy lookup
    const dbCountriesMap = new Map(
      dbCountries.map((country) => [country.alpha2Code, country])
    );

    // Identify countries that are missing in the database
    // Ensure that alpha2Code is treated as a string
    const missingCountries = fetchedCountries.filter(
      (country) => country.alpha2Code && !dbCountriesMap.has(country.alpha2Code)
    );

    // Log the names and cca2 codes of missing countries
    missingCountries.forEach((country) => {
      console.log(
        `Missing country: ${country.name} (alpha2Code: ${country.alpha2Code})`
      );
    });

    if (missingCountries.length === 0) {
      console.log("No missing countries found.");
    } else {
      // Here call function that adds missing country to database
      // I'll need to also fetch and add the gdp data for each of the missing countries before adding to db
      for (const country of missingCountries) {
        await addCountryWithGdp(country);
      }
    }
  } catch (error) {
    console.error("Failed to find missing countries:", error);
  }
};

const addCountryWithGdp = async (countryData: Partial<CountryData>) => {
  try {
    // Check if a country with the same alpha2Code already exists in the database
    console.log(
      `Checking if ${countryData.name} with alpha2Code ${countryData.alpha2Code} exists...`
    );
    const existingCountry = await prisma.country.findUnique({
      where: {
        alpha2Code: countryData.alpha2Code,
      },
    });

    if (existingCountry) {
      console.error(
        `A country with the alpha2Code ${countryData.alpha2Code} already exists in the database. Existing entry:`,
        existingCountry
      );
      return; // Skip adding this country
    }

    console.log(
      `This country, ${countryData.name} with alpha2Code ${countryData.alpha2Code} does not exist. Atempting to add it to the database...`
    );
    // Fetch and transform the gdp data for the missing countries
    const updatedCountryData = await fetchGdpData(countryData);

    // Prepare the currency data by checking existing currencies or creating new ones
    const currencyOperations =
      updatedCountryData.currencies?.map(async (currency) => {
        let currencyRecord = await prisma.currency.findUnique({
          where: { code: currency.code },
        });

        if (!currencyRecord) {
          currencyRecord = await prisma.currency.create({
            data: {
              code: currency.code,
              name: currency.name,
            },
          });
        }
        // Return the currency data along with the id
        return {
          id: currencyRecord.id,
          code: currency.code,
          name: currency.name,
        };
      }) ?? [];

    // Resolve all currency operations
    const resolvedCurrencies = await Promise.all(currencyOperations);

    // Add the country with all of it's information to teh database
    await prisma.country.create({
      data: {
        alpha2Code: updatedCountryData.alpha2Code ?? "Unknown",
        alpha3Code: updatedCountryData.alpha3Code ?? "Unknown",
        altSpellings: updatedCountryData.altSpellings ?? [],
        area: updatedCountryData.area ?? null,
        borders: updatedCountryData.borders ?? [],
        capital: updatedCountryData.capital ?? null,
        cioc: updatedCountryData.cioc ?? null,
        continents: updatedCountryData.continents ?? [],
        demonym: updatedCountryData.demonym ?? null,
        flag: updatedCountryData.flag ?? null,
        gini: updatedCountryData.gini ?? null,
        latlng: Array.isArray(updatedCountryData.latlng)
          ? updatedCountryData.latlng
          : [],
        name: updatedCountryData.name ?? "Unnamed Country",
        nativeName: updatedCountryData.nativeName ?? "Unknown Native Name",
        numericCode: updatedCountryData.numericCode ?? null,
        population: updatedCountryData.population
          ? BigInt(updatedCountryData.population)
          : BigInt(0),
        region: updatedCountryData.region ?? "Unknown",
        subregion: updatedCountryData.subregion ?? null,
        timezones: updatedCountryData.timezones ?? [],
        unMember: updatedCountryData.unMember ?? null,
        gdp: updatedCountryData.gdp ?? null,
        gdpDate: updatedCountryData.gdpDate ?? null,
        currencies: {
          connectOrCreate: resolvedCurrencies.map((currency) => ({
            where: { code: currency.code },
            create: {
              code: currency.code,
              name: currency.name,
            },
          })),
        },
      },
    });

    console.log(
      `Successfully added ${updatedCountryData.name} with GDP data to the database.`
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Check if we have a unique constraint violation
      if (error.code === "P2002") {
        console.error(
          `A country with the same code already exists in the database. Failed to add ${countryData.name}.`
        );
        // Attempt to log the existing country's Prisma ID
        const conflictingCountry = await prisma.country.findFirst({
          where: {
            OR: [
              { alpha2Code: countryData.alpha2Code },
              { alpha3Code: countryData.alpha3Code },
            ],
          },
          select: { id: true },
        });
        if (conflictingCountry) {
          console.error(`Conflicting country ID: ${conflictingCountry.id}`);
        }
      } else {
        console.error(
          `An error occurred while adding ${countryData.name}: ${error.message}`
        );
      }
    } else if (error instanceof Prisma.PrismaClientValidationError) {
      console.error(
        `Validation failed while adding ${countryData.name}: ${error.message}`
      );
    } else {
      console.error(
        `An unexpected error occurred while adding ${countryData.name}: ${error}`
      );
    }
    // Decide whether to throw the error or not based on your process requirements
    throw error; // This will stop the process if that's the desired outcome
  }
};
findMissingCountries();

import { PrismaClient } from "@prisma/client";

import { fetchCountriesData } from "./fetchCountries";
import { fetchGdpData } from "./fetchGdpData";
const readline = require("readline");

const prisma = new PrismaClient();

const SECRET_ANSWER = process.env.SECRET_ANSWER;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Enter password to run the script
rl.question(
  "Enter the password to execute this script: ",
  function (inputPassword: string) {
    if (inputPassword === SECRET_ANSWER) {
      console.log("Password correct. Executing script...");
      // Execute da code
      populateCountries().then(() => {
        rl.close();
      });
    } else {
      console.log("Incorrect password. Exiting.");
      rl.close();
      process.exit(1);
    }
  }
);

export const populateCountries = async () => {
  // Start the population process and handle any high-level errors
  try {
    console.log("Starting to populate countries with GDP data...");

    // Fetch initial country data
    const countriesData = await fetchCountriesData();

    // Ensure there is data to work with, otherwise throw an error
    if (!countriesData) {
      throw new Error("Failed to fetch countries data");
    }

    // Process each country individually
    for (const countryData of countriesData) {
      console.log(`Processing country: ${countryData.name}`);

      // Fetch and process GDP data for each country
      try {
        const updatedCountryData = await fetchGdpData(countryData);
        console.log(`GDP data processed for ${updatedCountryData.name}`);

        // Attempt to create a database entry for each country
        try {
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
              nativeName:
                updatedCountryData.nativeName ?? "Unknown Native Name",
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
                create:
                  updatedCountryData.currencies?.map((currency) => ({
                    code: currency.code,
                    name: currency.name,
                  })) ?? [],
              },
            },
          });
          console.log(
            `Successfully created database entry for ${updatedCountryData.name}.`
          );
        } catch (createError) {
          // Log any errors that occur during the database entry creation
          console.error(
            `Failed to create database entry for ${updatedCountryData.name}:`,
            createError
          );
        }
      } catch (gdpError) {
        // Log any errors that occur during GDP data processing
        console.error(
          `Failed to process GDP data for ${countryData.name}:`,
          gdpError
        );
      }
    }

    // Final log to indicate successful population
    console.log(
      "Successfully populated the database with country and GDP data."
    );
  } catch (error) {
    // Log any unexpected errors that occur during the population process
    console.error("Error populating the database:", error);
  }
};

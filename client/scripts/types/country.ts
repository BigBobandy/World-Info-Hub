export interface Country {
  id: number;
  alpha2Code: string;
  alpha3Code: string;
  altSpellings: string[];
  area?: number | null;
  borders: string[];
  capital?: string | null;
  cioc?: string | null;
  continents: string[];
  demonym?: string | null;
  flag?: string | null;
  gini?: number | null;
  latlng: [number, number];
  name: string;
  nativeName: string;
  numericCode?: string | null;
  population: bigint;
  region: string;
  subregion?: string | null;
  timezones: string[];
  unMember?: boolean | null;
  gdp?: number | null;
  gdpDate?: Date | null;
  currencies: Currency[];
}

export interface Currency {
  id: number;
  code: string;
  name: string;
  countries: Country[];
}

export interface ExtendedCountry extends Country {
  gdpPerCapita?: number;
}

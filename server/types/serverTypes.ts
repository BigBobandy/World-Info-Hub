export type Currency = {
  code: string;
  name: string;
};

export type CountryData = {
  alpha2Code: string;
  alpha3Code: string;
  altSpellings: string[];
  area?: number;
  borders: string[];
  capital?: string;
  cioc?: string;
  continents: string[];
  demonym?: string;
  flag?: string;
  gini: number;
  latlng: number;
  name: string;
  nativeName: string;
  numericCode?: string;
  population: bigint;
  region: string;
  subregion?: string;
  timezones: string[];
  unMember?: boolean;
  gdp?: number;
  gdpDate?: Date | string;
  currencies: Currency[];
};

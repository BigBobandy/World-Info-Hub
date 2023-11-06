"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var fetchCountries_1 = require("./fetchCountries");
var fetchGdpData_1 = require("./fetchGdpData");
var prisma = new client_1.PrismaClient();
var findMissingCountries = function () { return __awaiter(void 0, void 0, void 0, function () {
    var fetchedCountries, dbCountries, dbCountriesMap_1, missingCountries, _i, missingCountries_1, country, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 8, , 9]);
                return [4 /*yield*/, (0, fetchCountries_1.fetchCountriesData)()];
            case 1:
                fetchedCountries = _a.sent();
                // If fetchedCountries is undefined, throw an error or exit the function
                if (!fetchedCountries) {
                    console.error("No countries data was fetched.");
                    return [2 /*return*/]; // Exit the function if there's no data
                }
                return [4 /*yield*/, prisma.country.findMany()];
            case 2:
                dbCountries = _a.sent();
                dbCountriesMap_1 = new Map(dbCountries.map(function (country) { return [country.alpha2Code, country]; }));
                missingCountries = fetchedCountries.filter(function (country) { return country.alpha2Code && !dbCountriesMap_1.has(country.alpha2Code); });
                // Log the names and cca2 codes of missing countries
                missingCountries.forEach(function (country) {
                    console.log("Missing country: ".concat(country.name, " (alpha2Code: ").concat(country.alpha2Code, ")"));
                });
                if (!(missingCountries.length === 0)) return [3 /*break*/, 3];
                console.log("No missing countries found.");
                return [3 /*break*/, 7];
            case 3:
                _i = 0, missingCountries_1 = missingCountries;
                _a.label = 4;
            case 4:
                if (!(_i < missingCountries_1.length)) return [3 /*break*/, 7];
                country = missingCountries_1[_i];
                return [4 /*yield*/, addCountryWithGdp(country)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 4];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_1 = _a.sent();
                console.error("Failed to find missing countries:", error_1);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
var addCountryWithGdp = function (countryData) { return __awaiter(void 0, void 0, void 0, function () {
    var existingCountry, updatedCountryData, currencyOperations, resolvedCurrencies, error_2, conflictingCountry;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    return __generator(this, function (_y) {
        switch (_y.label) {
            case 0:
                _y.trys.push([0, 5, , 11]);
                // Check if a country with the same alpha2Code already exists in the database
                console.log("Checking if ".concat(countryData.name, " with alpha2Code ").concat(countryData.alpha2Code, " exists..."));
                return [4 /*yield*/, prisma.country.findUnique({
                        where: {
                            alpha2Code: countryData.alpha2Code,
                        },
                    })];
            case 1:
                existingCountry = _y.sent();
                if (existingCountry) {
                    console.error("A country with the alpha2Code ".concat(countryData.alpha2Code, " already exists in the database. Existing entry:"), existingCountry);
                    return [2 /*return*/]; // Skip adding this country
                }
                console.log("This country, ".concat(countryData.name, " with alpha2Code ").concat(countryData.alpha2Code, " does not exist. Atempting to add it to the database..."));
                return [4 /*yield*/, (0, fetchGdpData_1.fetchGdpData)(countryData)];
            case 2:
                updatedCountryData = _y.sent();
                currencyOperations = (_b = (_a = updatedCountryData.currencies) === null || _a === void 0 ? void 0 : _a.map(function (currency) { return __awaiter(void 0, void 0, void 0, function () {
                    var currencyRecord;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, prisma.currency.findUnique({
                                    where: { code: currency.code },
                                })];
                            case 1:
                                currencyRecord = _a.sent();
                                if (!!currencyRecord) return [3 /*break*/, 3];
                                return [4 /*yield*/, prisma.currency.create({
                                        data: {
                                            code: currency.code,
                                            name: currency.name,
                                        },
                                    })];
                            case 2:
                                currencyRecord = _a.sent();
                                _a.label = 3;
                            case 3: 
                            // Return the currency data along with the id
                            return [2 /*return*/, {
                                    id: currencyRecord.id,
                                    code: currency.code,
                                    name: currency.name,
                                }];
                        }
                    });
                }); })) !== null && _b !== void 0 ? _b : [];
                return [4 /*yield*/, Promise.all(currencyOperations)];
            case 3:
                resolvedCurrencies = _y.sent();
                // Add the country with all of it's information to teh database
                return [4 /*yield*/, prisma.country.create({
                        data: {
                            alpha2Code: (_c = updatedCountryData.alpha2Code) !== null && _c !== void 0 ? _c : "Unknown",
                            alpha3Code: (_d = updatedCountryData.alpha3Code) !== null && _d !== void 0 ? _d : "Unknown",
                            altSpellings: (_e = updatedCountryData.altSpellings) !== null && _e !== void 0 ? _e : [],
                            area: (_f = updatedCountryData.area) !== null && _f !== void 0 ? _f : null,
                            borders: (_g = updatedCountryData.borders) !== null && _g !== void 0 ? _g : [],
                            capital: (_h = updatedCountryData.capital) !== null && _h !== void 0 ? _h : null,
                            cioc: (_j = updatedCountryData.cioc) !== null && _j !== void 0 ? _j : null,
                            continents: (_k = updatedCountryData.continents) !== null && _k !== void 0 ? _k : [],
                            demonym: (_l = updatedCountryData.demonym) !== null && _l !== void 0 ? _l : null,
                            flag: (_m = updatedCountryData.flag) !== null && _m !== void 0 ? _m : null,
                            gini: (_o = updatedCountryData.gini) !== null && _o !== void 0 ? _o : null,
                            latlng: Array.isArray(updatedCountryData.latlng)
                                ? updatedCountryData.latlng
                                : [],
                            name: (_p = updatedCountryData.name) !== null && _p !== void 0 ? _p : "Unnamed Country",
                            nativeName: (_q = updatedCountryData.nativeName) !== null && _q !== void 0 ? _q : "Unknown Native Name",
                            numericCode: (_r = updatedCountryData.numericCode) !== null && _r !== void 0 ? _r : null,
                            population: updatedCountryData.population
                                ? BigInt(updatedCountryData.population)
                                : BigInt(0),
                            region: (_s = updatedCountryData.region) !== null && _s !== void 0 ? _s : "Unknown",
                            subregion: (_t = updatedCountryData.subregion) !== null && _t !== void 0 ? _t : null,
                            timezones: (_u = updatedCountryData.timezones) !== null && _u !== void 0 ? _u : [],
                            unMember: (_v = updatedCountryData.unMember) !== null && _v !== void 0 ? _v : null,
                            gdp: (_w = updatedCountryData.gdp) !== null && _w !== void 0 ? _w : null,
                            gdpDate: (_x = updatedCountryData.gdpDate) !== null && _x !== void 0 ? _x : null,
                            currencies: {
                                connectOrCreate: resolvedCurrencies.map(function (currency) { return ({
                                    where: { code: currency.code },
                                    create: {
                                        code: currency.code,
                                        name: currency.name,
                                    },
                                }); }),
                            },
                        },
                    })];
            case 4:
                // Add the country with all of it's information to teh database
                _y.sent();
                console.log("Successfully added ".concat(updatedCountryData.name, " with GDP data to the database."));
                return [3 /*break*/, 11];
            case 5:
                error_2 = _y.sent();
                if (!(error_2 instanceof client_1.Prisma.PrismaClientKnownRequestError)) return [3 /*break*/, 9];
                if (!(error_2.code === "P2002")) return [3 /*break*/, 7];
                console.error("A country with the same code already exists in the database. Failed to add ".concat(countryData.name, "."));
                return [4 /*yield*/, prisma.country.findFirst({
                        where: {
                            OR: [
                                { alpha2Code: countryData.alpha2Code },
                                { alpha3Code: countryData.alpha3Code },
                            ],
                        },
                        select: { id: true },
                    })];
            case 6:
                conflictingCountry = _y.sent();
                if (conflictingCountry) {
                    console.error("Conflicting country ID: ".concat(conflictingCountry.id));
                }
                return [3 /*break*/, 8];
            case 7:
                console.error("An error occurred while adding ".concat(countryData.name, ": ").concat(error_2.message));
                _y.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                if (error_2 instanceof client_1.Prisma.PrismaClientValidationError) {
                    console.error("Validation failed while adding ".concat(countryData.name, ": ").concat(error_2.message));
                }
                else {
                    console.error("An unexpected error occurred while adding ".concat(countryData.name, ": ").concat(error_2));
                }
                _y.label = 10;
            case 10: 
            // Decide whether to throw the error or not based on your process requirements
            throw error_2; // This will stop the process if that's the desired outcome
            case 11: return [2 /*return*/];
        }
    });
}); };
findMissingCountries();

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
exports.populateCountries = void 0;
var client_1 = require("@prisma/client");
var fetchCountries_1 = require("./fetchCountries");
var fetchGdpData_1 = require("./fetchGdpData");
var prisma = new client_1.PrismaClient();
var populateCountries = function () { return __awaiter(void 0, void 0, void 0, function () {
    var countriesData, _i, countriesData_1, countryData, updatedCountryData, createError_1, gdpError_1, error_1;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
    return __generator(this, function (_y) {
        switch (_y.label) {
            case 0:
                _y.trys.push([0, 12, , 13]);
                console.log("Starting to populate countries with GDP data...");
                return [4 /*yield*/, (0, fetchCountries_1.fetchCountriesData)()];
            case 1:
                countriesData = _y.sent();
                // Ensure there is data to work with, otherwise throw an error
                if (!countriesData) {
                    throw new Error("Failed to fetch countries data");
                }
                _i = 0, countriesData_1 = countriesData;
                _y.label = 2;
            case 2:
                if (!(_i < countriesData_1.length)) return [3 /*break*/, 11];
                countryData = countriesData_1[_i];
                console.log("Processing country: ".concat(countryData.name));
                _y.label = 3;
            case 3:
                _y.trys.push([3, 9, , 10]);
                return [4 /*yield*/, (0, fetchGdpData_1.fetchGdpData)(countryData)];
            case 4:
                updatedCountryData = _y.sent();
                console.log("GDP data processed for ".concat(updatedCountryData.name));
                _y.label = 5;
            case 5:
                _y.trys.push([5, 7, , 8]);
                return [4 /*yield*/, prisma.country.create({
                        data: {
                            alpha2Code: (_a = updatedCountryData.alpha2Code) !== null && _a !== void 0 ? _a : "Unknown",
                            alpha3Code: (_b = updatedCountryData.alpha3Code) !== null && _b !== void 0 ? _b : "Unknown",
                            altSpellings: (_c = updatedCountryData.altSpellings) !== null && _c !== void 0 ? _c : [],
                            area: (_d = updatedCountryData.area) !== null && _d !== void 0 ? _d : null,
                            borders: (_e = updatedCountryData.borders) !== null && _e !== void 0 ? _e : [],
                            capital: (_f = updatedCountryData.capital) !== null && _f !== void 0 ? _f : null,
                            cioc: (_g = updatedCountryData.cioc) !== null && _g !== void 0 ? _g : null,
                            continents: (_h = updatedCountryData.continents) !== null && _h !== void 0 ? _h : [],
                            demonym: (_j = updatedCountryData.demonym) !== null && _j !== void 0 ? _j : null,
                            flag: (_k = updatedCountryData.flag) !== null && _k !== void 0 ? _k : null,
                            gini: (_l = updatedCountryData.gini) !== null && _l !== void 0 ? _l : null,
                            latlng: Array.isArray(updatedCountryData.latlng)
                                ? updatedCountryData.latlng
                                : [],
                            name: (_m = updatedCountryData.name) !== null && _m !== void 0 ? _m : "Unnamed Country",
                            nativeName: (_o = updatedCountryData.nativeName) !== null && _o !== void 0 ? _o : "Unknown Native Name",
                            numericCode: (_p = updatedCountryData.numericCode) !== null && _p !== void 0 ? _p : null,
                            population: updatedCountryData.population
                                ? BigInt(updatedCountryData.population)
                                : BigInt(0),
                            region: (_q = updatedCountryData.region) !== null && _q !== void 0 ? _q : "Unknown",
                            subregion: (_r = updatedCountryData.subregion) !== null && _r !== void 0 ? _r : null,
                            timezones: (_s = updatedCountryData.timezones) !== null && _s !== void 0 ? _s : [],
                            unMember: (_t = updatedCountryData.unMember) !== null && _t !== void 0 ? _t : null,
                            gdp: (_u = updatedCountryData.gdp) !== null && _u !== void 0 ? _u : null,
                            gdpDate: (_v = updatedCountryData.gdpDate) !== null && _v !== void 0 ? _v : null,
                            currencies: {
                                create: (_x = (_w = updatedCountryData.currencies) === null || _w === void 0 ? void 0 : _w.map(function (currency) { return ({
                                    code: currency.code,
                                    name: currency.name,
                                }); })) !== null && _x !== void 0 ? _x : [],
                            },
                        },
                    })];
            case 6:
                _y.sent();
                console.log("Successfully created database entry for ".concat(updatedCountryData.name, "."));
                return [3 /*break*/, 8];
            case 7:
                createError_1 = _y.sent();
                // Log any errors that occur during the database entry creation
                console.error("Failed to create database entry for ".concat(updatedCountryData.name, ":"), createError_1);
                return [3 /*break*/, 8];
            case 8: return [3 /*break*/, 10];
            case 9:
                gdpError_1 = _y.sent();
                // Log any errors that occur during GDP data processing
                console.error("Failed to process GDP data for ".concat(countryData.name, ":"), gdpError_1);
                return [3 /*break*/, 10];
            case 10:
                _i++;
                return [3 /*break*/, 2];
            case 11:
                // Final log to indicate successful population
                console.log("Successfully populated the database with country and GDP data.");
                return [3 /*break*/, 13];
            case 12:
                error_1 = _y.sent();
                // Log any unexpected errors that occur during the population process
                console.error("Error populating the database:", error_1);
                return [3 /*break*/, 13];
            case 13: return [2 /*return*/];
        }
    });
}); };
exports.populateCountries = populateCountries;
(0, exports.populateCountries)();

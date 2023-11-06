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
exports.fetchCountriesData = void 0;
var REST_COUNTRIES_API = "https://restcountries.com/v3.1/all";
var fetchCountriesData = function () { return __awaiter(void 0, void 0, void 0, function () {
    var response, rawData, transformedData, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, fetch(REST_COUNTRIES_API)];
            case 1:
                response = _a.sent();
                if (!response.ok) {
                    throw new Error("Failed to fetch countries data: ".concat(response.status));
                }
                return [4 /*yield*/, response.json()];
            case 2:
                rawData = _a.sent();
                transformedData = rawData.map(function (country) {
                    // Transform currency data
                    var currencies = Object.entries(country.currencies || {}).map(function (_a) {
                        var code = _a[0], currency = _a[1];
                        return ({
                            code: code,
                            name: currency.name,
                        });
                    });
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
                            ? Object.values(country.name.nativeName)[0].common
                            : country.name.common,
                        numericCode: country.ccn3,
                        population: country.population,
                        region: country.region,
                        subregion: country.subregion,
                        timezones: country.timezones,
                        unMember: country.unMember,
                        currencies: currencies,
                        // gdp and gdpDate will be added after fetching from the World Bank API
                    };
                });
                console.log(transformedData); // Log the transformed data to verify it's correct
                return [2 /*return*/, transformedData];
            case 3:
                error_1 = _a.sent();
                console.error("Error fetching countries data:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.fetchCountriesData = fetchCountriesData;
(0, exports.fetchCountriesData)();

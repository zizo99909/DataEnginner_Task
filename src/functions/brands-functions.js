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
exports.exportData = exports.seedData = exports.transformData = void 0;
var fs_1 = require("fs");
var faker = require("@faker-js/faker");
var brands_schema_1 = require("../db/brands-schema");
function transformData() {
    return __awaiter(this, void 0, void 0, function () {
        var brands, _loop_1, fieldsToRemove, _i, brands_1, brand, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    return [4 /*yield*/, brands_schema_1.BrandModel.find({})];
                case 1:
                    brands = _a.sent();
                    _loop_1 = function (brand) {
                        var schemaPaths, documentKeys;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    schemaPaths = Object.keys(brand.schema.paths);
                                    documentKeys = Object.keys(brand.toJSON());
                                    // Identify fields not in the schema
                                    fieldsToRemove = documentKeys.filter(function (key) { return !schemaPaths.includes(key); });
                                    fieldsToRemove.forEach(function (field) {
                                        delete brand[field];
                                    });
                                    if (!brand.yearFounded) {
                                        brand.yearFounded = 1600;
                                    }
                                    if (brand.yearFounded < 1600 || brand.yearFounded == null) {
                                        brand.yearFounded = 1600;
                                    }
                                    if (!brand.brandName) {
                                        brand.brandName = "";
                                    }
                                    if (!brand.headquarters) {
                                        brand.headquarters = "";
                                    }
                                    return [4 /*yield*/, brand.save()];
                                case 1:
                                    _b.sent();
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, brands_1 = brands;
                    _a.label = 2;
                case 2:
                    if (!(_i < brands_1.length)) return [3 /*break*/, 5];
                    brand = brands_1[_i];
                    return [5 /*yield**/, _loop_1(brand)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 2];
                case 5:
                    console.log('Data transformation completed');
                    return [3 /*break*/, 7];
                case 6:
                    error_1 = _a.sent();
                    console.error('Error transforming data:', error_1);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.transformData = transformData;
function seedData() {
    return __awaiter(this, void 0, void 0, function () {
        var newBrands, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    newBrands = Array.from({ length: 10 }, function () { return ({
                        name: faker.Faker.name,
                        yearFounded: faker.allFakers.en.number,
                        numberOfLocations: faker.allFakers.en.number
                    }); });
                    return [4 /*yield*/, brands_schema_1.BrandModel.insertMany(newBrands)];
                case 1:
                    _a.sent();
                    console.log('Data seeding completed');
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    console.error('Error seeding data:', error_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.seedData = seedData;
function exportData() {
    return __awaiter(this, void 0, void 0, function () {
        var brands, jsonData, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, brands_schema_1.BrandModel.find()];
                case 1:
                    brands = _a.sent();
                    jsonData = JSON.stringify(brands, null, 2);
                    fs_1.default.writeFileSync('brands.json', jsonData);
                    console.log('Data exported to JSON file');
                    return [3 /*break*/, 3];
                case 2:
                    error_3 = _a.sent();
                    console.error('Error exporting data:', error_3);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.exportData = exportData;

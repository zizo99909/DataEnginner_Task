"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require ('mongoose');
// const {Schema} = mongoose;
var mongoose_1 = require("mongoose");
mongoose_1.connect('mongodb://127.0.0.1:27017/brands-collection');
var brandSchema = new mongoose_1.Schema({
    brandName: {
        type: String,
        required: [true, 'Brand name is required'],
        trim: true,
    },
    yearFounded: {
        type: Number,
        required: [true, 'Year founded is required'],
        min: [1600, 'Year founded seems too old'],
        max: [new Date().getFullYear(), 'Year founded cannot be in the future'],
    },
    headquarters: {
        type: String,
        required: [true, 'Headquarters location is required'],
        trim: true,
    },
    numberOfLocations: {
        type: Number,
        required: [true, 'Number of locations is required'],
        min: [1, 'There should be at least one location'],
    },
}, {
    timestamps: true,
});
var BrandModel = mongoose_1.model('Brand', brandSchema);
var myBrand = new BrandModel({
    brandName: 'Nike',
    yearFounded: 2002,
    headquarters: 'USA',
    numberOfLocations: 1000
});
myBrand.save().then(function () {
    console.log(myBrand);
}).catch(function (error) {
    console.log('Error!', error);
});
var Brand = mongoose_1.model('Brand', brandSchema);
module.exports = Brand;

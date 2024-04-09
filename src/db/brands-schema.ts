import mongoose, { Schema, Document } from 'mongoose';

interface IBrand extends Document {
	brandName: string;
	yearFounded: number;
	headquarters: string;
	numberOfLocations: number;
  }

const brandSchema :Schema<IBrand>= new Schema({
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

//const BrandModel = mongoose.model<IBrand>('Brand', brandSchema);

// const myBrand = new BrandModel({
// 	brandName : 'Nike',
// 	yearFounded : 2002,
// 	headquarters : 'USA',
// 	numberOfLocations : 1000
// })

// myBrand.save().then(()=>{
// console.log(myBrand);
// }).catch((error)=>{
// 	console.log('Error!',error);
// })


export const BrandModel = mongoose.model<IBrand & Document>('Brand', brandSchema);
// const Brand = mongoose.model('Brand', brandSchema);

// module.exports = Brand;

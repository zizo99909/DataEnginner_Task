import fs from 'fs';
import * as faker from "@faker-js/faker";
import { BrandModel } from '../db/brands-schema';

export async function transformData() {
    try {
        const brands = await BrandModel.find({});

        for (const brand of brands) {
 // Get the schema paths
 const schemaPaths = Object.keys(brand.schema.paths);

 // Get the keys (fields) of the document
 const documentKeys = Object.keys(brand.toJSON());

 // Identify fields not in the schema
 var fieldsToRemove = documentKeys.filter(key => !schemaPaths.includes(key));

 fieldsToRemove.forEach(field => {
    delete (brand as any)[field];
  });

            if (!brand.yearFounded) {
                brand.yearFounded = 1600;
            }
            if(brand.yearFounded<1600 || brand.yearFounded==null){
                brand.yearFounded=1600;
            }
            if(!brand.brandName){
                brand.brandName = "";
            }
            if(!brand.headquarters){
                brand.headquarters = "";
            }

            await brand.save();
        }

        console.log('Data transformation completed');
    } catch (error) {
        console.error('Error transforming data:', error);
    }
}

export async function seedData() {
    try {
        const newBrands = Array.from({ length: 10 }, () => ({
            name: faker.Faker.name,
            yearFounded: faker.allFakers.en.number,
            numberOfLocations: faker.allFakers.en.number
        }));

        await BrandModel.insertMany(newBrands);

        console.log('Data seeding completed');
    } catch (error) {
        console.error('Error seeding data:', error);
    }
}

export async function exportData() {
    try {
        const brands = await BrandModel.find();
        const jsonData = JSON.stringify(brands, null, 2);

        fs.writeFileSync('brands.json', jsonData);

        console.log('Data exported to JSON file');
    } catch (error) {
        console.error('Error exporting data:', error);
    }
}

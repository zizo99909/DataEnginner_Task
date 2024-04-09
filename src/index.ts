// src/index.ts
import mongoose from 'mongoose';

import { transformData, seedData, exportData } from './functions/brands-functions';

async function main() {
    mongoose.connect('mongodb://127.0.0.1:27017/mongodb-data');
    await transformData();
    await seedData();
    await exportData();
    mongoose.disconnect();
}

main();

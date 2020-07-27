import * as path from 'path';

import { ICatalogueEntry, getCatalogEntry } from './catalogue';
import { LocalStorage } from '../util/storage-local';

// -----------------------------------------------------------------------------

export interface IPlant extends IPlantBase, ICatalogueEntry {}

export function getPlants(): IPlant[] {
    const plantsStore = storage.getAll();
    const plants = [];
    for (const key in plantsStore) {
        const { name, plantedAt, catalogueEntry } = plantsStore[key];
        const catalogData = getCatalogEntry(catalogueEntry);
        const plant = { name, plantedAt, ...catalogData };
        plants.push(plant);
    }
    return plants;
}

// -----------------------------------------------------------------------------

interface IPlantBase {
    name: string;
    plantedAt: number;
}

interface IPlantStorage extends IPlantBase {
    catalogueEntry: string; // foreign key for catalogue
}

const dataDir = path.resolve(__dirname, '..', '..', 'data');
const filename = 'plants.json';
const filepath = path.join(dataDir, filename);

const storage = LocalStorage<IPlantStorage>(filepath);
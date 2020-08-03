import * as path from 'path';

import { LocalStorage } from '../util/storage-local';

// -----------------------------------------------------------------------------

export interface IPlant {
    name: string;
    species: string; // foreign key in catalogue
    pot: number;
    plantedAt: number;
    replantedAt: number|null;
}

export function getPlants() {
    const plants = storage.filter(plant => plant.replantedAt !== null);
    
    let result: IPlant[] = [];
    for (const key in plants) {
        result.push(plants[key]);
    }
    return result;
}

export function plant(species: string, pot: number, name?: string): IPlant {
    const plant: IPlant = {
        name: name || '', pot, species,
        plantedAt: Date.now(),
        replantedAt: null,
    };
    storage.save(plant);
    return plant;
}

export function replant(pot: number) {
    const plantEntry = storage.filter(plant => plant.replantedAt !== null && plant.pot === pot);

    const id = Object.keys(plantEntry)[0];
    const plant = plantEntry[id];

    plant.replantedAt = Date.now();
    storage.set(id, plant);

    return plant;
}

// -----------------------------------------------------------------------------

const dataDir = path.resolve(__dirname, '..', '..', 'data');
const filename = 'plants.json';
const filepath = path.join(dataDir, filename);

const storage = LocalStorage<IPlant>(filepath);
import * as path from 'path';

import { LocalStorage } from '../util/storage-local';

// -----------------------------------------------------------------------------

export interface ICatalogueEntry {
    species: string; // is also used as id for storage
    daysTilReplant: number;
    minSoilHumidity: number; // in percent
    plantingProcess: IPlantingStep[];
    wikipediaURL: string;
}

export interface IPlantingStep {
    instruction: string;
    checkType: ECheckType;
    checkValue: number;
}

export enum ECheckType { MANUAL, SOIL_HUMIDITY }

export function getCatalogEntry(id: string): ICatalogueEntry {
    return storage.get(id);
}

// -----------------------------------------------------------------------------

const dataDir = path.resolve(__dirname, '..', '..', 'data');
const filename = 'catalogue.json';
const filepath = path.join(dataDir, filename);

const storage = LocalStorage<ICatalogueEntry>(filepath);
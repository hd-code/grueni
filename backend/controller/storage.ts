import * as path from 'path';

import { IApp } from '../models/app';
import { ICatalogEntry } from '../models/catalog';
import { IHistoryEntry } from '../models/history';
import { IPlant } from '../models/plant';
import { LocalStorage } from '../util/storage-local';

// --- Catalog -----------------------------------------------------------------

export function getCatalogEntry(species: string): ICatalogEntry {
    return catalogStore.get(species);
}

// --- History -----------------------------------------------------------------

export function getHistoryAfterTS(timestamp: number): IHistoryEntry[] {
    let i = 0;
    for (let ie = appData.history.length; i < ie; i++) {
        const entry = appData.history[i];
        if (entry.timestamp >= timestamp)
            break;
    }
    return appData.history.slice(i);
}

export function getLatestHistoryEntry(): IHistoryEntry {
    const lastIndex = appData.history.length - 1;
    return appData.history[lastIndex];
}

export function saveHistoryEntry(entry: IHistoryEntry) {
    appData.history.push(entry);
    saveAppData();
}

// --- Plants ------------------------------------------------------------------

export function getPlants(): (IPlant|null)[] {
    return appData.plants;
}

export function plant(species: string, pot: number): IPlant {
    const plant: IPlant = {
        species,
        plantedAt: Date.now(),
        replantedAt: null,
    };

    appData.plants[pot] = plant;
    saveAppData();

    return plant;
}

export function replant(pot: number): IPlant {
    const plant = appData.plants[pot];
    plant.replantedAt = Date.now();

    appData.plants[pot] = null;
    saveAppData();

    return plant;
}

// -----------------------------------------------------------------------------

const dataDir = path.resolve(__dirname, '..', '..', 'data');

const catalogStore = LocalStorage<ICatalogEntry>(path.join(dataDir, 'catalog.json'));
const appStore = LocalStorage<IApp>(path.join(dataDir, 'app.json'));

const appStoreKey = 'currentData';

// -----------------------------------------------------------------------------

const appData = appStore.get(appStoreKey);

function saveAppDataSync() {
    appStore.set(appStoreKey, appData);
}

function saveAppData() {
    setImmediate(saveAppDataSync);
}
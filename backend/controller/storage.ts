import * as path from 'path';

import { IApp } from '../models/app';
import { ICatalogEntry } from '../models/catalog';
import { IHistoryEntry } from '../models/history';
import { LocalStorage } from '../util/storage-local';

// -----------------------------------------------------------------------------

export function getCatalogEntry(species: string): ICatalogEntry {
    return catalogStore.get(species);
}

// -----------------------------------------------------------------------------

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
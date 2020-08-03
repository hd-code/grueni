import * as path from 'path';

import { LocalStorage } from '../util/storage-local';

// -----------------------------------------------------------------------------

export interface IHistoryEntry {
    timestamp: number; // also used as index in storage
    airHumidity: number; // in Prozent, ganzzahlig
    light: number; // in lumen
    temperature: number; // in Grad, ganzzahlig
    pots: {
        soilHumidity: number; // in Prozent, ganzzahlig
        size: number; // in cm
    }[];
}

export function getHistoryAfterTS(timestamp: number): IHistoryEntry[] {
    const entries = storage.filter(entry => entry.timestamp >= timestamp);
    return Object.values(entries);
}

export function saveHistoryEntry(entry: IHistoryEntry) {
    const id = '' + entry.timestamp;
    storage.set(id, entry);
}

// -----------------------------------------------------------------------------

const dataDir = path.resolve(__dirname, '..', '..', 'data');
const filename = 'history.json';
const filepath = path.join(dataDir, filename);

const storage = LocalStorage<IHistoryEntry>(filepath);
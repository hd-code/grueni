import { getLatestHistoryEntry } from './storage';
import { IHistoryEntry, isHistoryEntry, isNewerEntry } from '../models/history';

// -----------------------------------------------------------------------------

export function getCurrentData(): IHistoryEntry {
    return currentData;
}

export function handleMessage(message: Buffer) {
    const json = message.toString('utf-8');
    const entry = JSON.parse(json);

    if (isHistoryEntry(entry) && isNewerEntry(entry, currentData)) {
        currentData = entry;
    }
}

// -----------------------------------------------------------------------------

let currentData: IHistoryEntry = getLatestHistoryEntry();
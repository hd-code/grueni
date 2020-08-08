import { getLatestHistoryEntry, saveHistoryEntry } from './storage';
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

// -----------------------------------------------------------------------------

const minute = 1000 * 60;

function addToHistory() {
    saveHistoryEntry(currentData);
}

setInterval(addToHistory, 15 * minute);

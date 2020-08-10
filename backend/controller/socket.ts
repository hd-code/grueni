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

// !!! do not save history, because the front end is not able to handle anything
// except the test data !!!

// const minute = 1000 * 60;

// function addToHistory() {
//     const latest = getLatestHistoryEntry();
//     if (isNewerEntry(currentData, latest)) {
//         saveHistoryEntry(currentData);
//     }
// }

// setInterval(addToHistory, 15 * minute);
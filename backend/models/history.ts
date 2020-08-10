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

export function isHistoryEntry(entry: any): entry is IHistoryEntry {
    return 'timestamp' in entry && typeof entry.timestamp === 'number'
        && 'airHumidity' in entry && typeof entry.airHumidity === 'number'
        && 'light' in entry && typeof entry.light === 'number'
        && 'temperature' in entry && typeof entry.temperature === 'number'
        && 'pots' in entry && Array.isArray(entry.pots) && entry.pots.every(
            pot => 'soilHumidity' in pot && typeof pot.soilHumidity === 'number'
        );
}

export function isNewerEntry(newer: IHistoryEntry, older: IHistoryEntry): boolean {
    return newer.timestamp > older.timestamp;
}
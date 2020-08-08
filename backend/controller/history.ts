import { getHistoryAfterTS } from './storage';
import { IHistoryEntry } from '../models/history';

// -----------------------------------------------------------------------------

export interface IChartEntry {
    key: number;
    value: number;
}

export function getAirHum(): IChartEntry[] {
    return getChartEntries(airToChart);
}

export function getLight(): IChartEntry[] {
    return getChartEntries(lightToChart);
}

export function getTemp(): IChartEntry[] {
    return getChartEntries(tempToChart);
}

// -----------------------------------------------------------------------------

const day = 1000 * 60 * 60 * 24;

function getTSOneDayAgo(): number {
    return new Date(Date.now() - day).getTime();
}

// -----------------------------------------------------------------------------

function getChartEntries(projection: (entry: IHistoryEntry) => IChartEntry): IChartEntry[] {
    const ts = getTSOneDayAgo();
    const entries = getHistoryAfterTS(ts);
    return entries.map(projection);
}

function airToChart(entry: IHistoryEntry): IChartEntry {
    return {
        key: entry.timestamp,
        value: entry.airHumidity
    };
}

function lightToChart(entry: IHistoryEntry): IChartEntry {
    return {
        key: entry.timestamp,
        value: entry.light
    };
}

function tempToChart(entry: IHistoryEntry): IChartEntry {
    return {
        key: entry.timestamp,
        value: entry.temperature
    };
}
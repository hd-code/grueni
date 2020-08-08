import { IHistoryEntry } from './history';
import { IPlant } from './plant';

// -----------------------------------------------------------------------------

export interface IApp {
    plants: (IPlant|null)[];
    history: IHistoryEntry[];
}
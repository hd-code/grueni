import * as storage from './storage';
import { getCurrentData } from './socket';
import { getCatalogEntry } from './storage';

// -----------------------------------------------------------------------------

export function getBoxData() {
    const { airHumidity, light, temperature, pots } = getCurrentData();

    const plantsInStore = storage.getPlants();
    const plants = plantsInStore.map((plant, i) => {
        if (!plant) {
            return null;
        }
        
        const soilHumidity = pots[i]?.soilHumidity ?? 0;
        const catalogEntry = getCatalogEntry(plant.species);
        return { ...catalogEntry, soilHumidity };
    });

    return { airHumidity, light, temperature, plants };
}
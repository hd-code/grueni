import { getPlants } from './storage';
import { getCurrentData } from './socket';


// interface IPlantProjection {
//     species: string;
//     daysTilReplant: number;
//     minSoilHumidity: number; // in percent
//     soilHumidity: number;
//     optSoilHumidity: number; // in percent
//     wikipediaURL: string;
// }

// function getPlantsProj(): IPlantProjection {
//     const data = getCurrentData();
//     const plants = getPlants();

//     const result = plants.map(plant => {
//         if (plant === null) return null;

//         return {

//         };
//     });
// }
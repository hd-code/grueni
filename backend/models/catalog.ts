export interface ICatalogEntry {
    species: string; // is also used as id for storage
    daysTilReplant: number;
    minSoilHumidity: number; // in percent
    optSoilHumidity: number; // in percent
    plantingProcess: IPlantingStep[];
    wikipediaURL: string;
}

export interface IPlantingStep {
    instruction: string;
    checkType: ECheckType;
    checkValue: number;
}

export enum ECheckType { MANUAL, SOIL_HUMIDITY }
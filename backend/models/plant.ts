export interface IPlant {
    species: string; // foreign key in catalog
    plantedAt: number;
    replantedAt: number|null;
}
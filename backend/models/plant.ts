export interface IPlant {
    name: string;
    species: string; // foreign key in catalog
    plantedAt: number;
    replantedAt: number|null;
}
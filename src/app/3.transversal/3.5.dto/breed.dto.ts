export interface BreedDto {
    id: string;
    name: string;
}

export interface BreedCompositeDto {
    getImageById: BreedImageDto[] | null;
    getById: BreedDetailDto | null;
}

export interface BreedImageDto {
    url: string;
}

export interface BreedDetailDto extends BreedDto {
    temperament: string;
    origin: string;
    description: string;
    energy_level: number;
    intelligence: number;
    social_needs: number;
    hairless: number;
    life_span: string;
}
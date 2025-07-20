interface Randomizer {
    id: string,
    name: string,
    description?: string,
    imageUrl?: string,
}   

interface EditRandomizerDto {
    name?: string,
    description?: string,
    imageUrl?: string,
}

export type {Randomizer, EditRandomizerDto}
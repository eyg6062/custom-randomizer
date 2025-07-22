interface Randomizer {
    id: string,
    name: string,
    description?: string,
    imageUrl?: string,
}   

interface RandomizerCardEditProps extends Randomizer {
    onEditClick: (id: string) => void; 
    onDeleteClick: (id: string) => void;
}

interface EditRandomizerDto {
    name?: string,
    description?: string,
    imageUrl?: string,
}

export type {Randomizer, RandomizerCardEditProps, EditRandomizerDto}
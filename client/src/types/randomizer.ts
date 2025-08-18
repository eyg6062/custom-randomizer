interface Randomizer {
    id: string,
    name: string,
    description?: string,
    imageUrl?: string,
    imageKey?: string,
}   

interface RandomizerCardEditProps extends Randomizer {
    onRenameClick: (id: string, prevName: string) => void,
    onEditThumbClick: (id: string) => void,
    onDeleteClick: (id: string) => void,
}

interface EditRandomizerDto {
    name?: string,
    description?: string,
    imageUrl?: string,
    imageKey?: string,
}

interface CreateRandomizerDto {
    name: string,
    imageFile?: File,
    description?: string,
}

export type {Randomizer, RandomizerCardEditProps, EditRandomizerDto, CreateRandomizerDto}
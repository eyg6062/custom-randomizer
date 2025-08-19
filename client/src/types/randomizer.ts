interface Randomizer {
    id: string,
    name: string,
    description?: string,
    imageKey?: string,
}   

interface RandomizerCardProps extends Randomizer {
    preSignedUrl?: string
}

interface RandomizerCardEditProps extends RandomizerCardProps {
    onRenameClick: (id: string, prevName: string) => void,
    onEditThumbClick: (id: string) => void,
    onDeleteClick: (id: string) => void,
}

interface EditRandomizerDto {
    name?: string,
    description?: string,
    imageKey?: string,
}

interface CreateRandomizerDto {
    name: string,
    imageFile?: File,
    description?: string,
}

export type {Randomizer, RandomizerCardProps, RandomizerCardEditProps, EditRandomizerDto, CreateRandomizerDto }
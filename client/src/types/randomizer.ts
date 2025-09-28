interface Randomizer {
    id: string,
    name: string,
    description?: string,
    imageKey?: string,
}   

interface RandomizerCardProps extends Randomizer {
    imageUrl?: string
}

interface RandomizerCardEditProps extends RandomizerCardProps {
    onRenameClick: (randProps: RandomizerCardProps) => void,
    onEditThumbClick: (randProps: RandomizerCardProps) => void,
    onDeleteClick: (randProps: RandomizerCardProps) => void,
}

interface EditRandomizerDto {
    name?: string,
    description?: string,
    imageKey?: string,
}

interface EditRandomizerCardDto extends EditRandomizerDto {
    imageUrl?: string
}

interface CreateRandomizerDto {
    name: string,
    imageFile?: File,
    description?: string,
}

export type {Randomizer, RandomizerCardProps, RandomizerCardEditProps, EditRandomizerDto, EditRandomizerCardDto, CreateRandomizerDto }
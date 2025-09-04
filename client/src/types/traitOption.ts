interface TraitOption {
    id: string,
    text?: string,
    imageKey?: string
}

interface TraitOptionProps extends TraitOption {
    imageUrl?: string
}

interface TraitOptionEditProps extends TraitOptionProps {
    editStatus: EditStatus
}

export enum EditStatus {
    Original,
    Edited,
    New
}

export type {TraitOption, TraitOptionProps, TraitOptionEditProps}
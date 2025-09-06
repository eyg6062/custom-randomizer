interface TraitOption {
    id: string,
    text?: string,
    imageKey?: string
}

interface TraitOptionProps extends TraitOption {
    imageUrl?: string
}

interface TraitOptionEditProps extends TraitOptionProps {
    editStatus: EditStatus,
    file?: File
}

export enum EditStatus {
    Original,
    Edited,
    New,
    Deleted
}

export type {TraitOption, TraitOptionProps, TraitOptionEditProps}
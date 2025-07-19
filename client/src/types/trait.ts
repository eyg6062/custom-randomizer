import { TraitType } from "./traitType";

interface Trait {
    id: number,
    name: string,
    traitType: TraitType,
}

interface BasicTrait extends Trait {
    traitOptions: TraitOption[]
}

interface NumberTrait extends Trait {
    minNum: number,
    maxNum: number,
}

interface TraitOption {
    text?: string,
    imageUrl?: string
}

export type {Trait, BasicTrait, NumberTrait, TraitOption}
import { TraitType } from "./traitType";

interface Trait {
    id: string,
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

type AnyTrait = BasicTrait | NumberTrait;

interface TraitOption {
    text?: string,
    imageKey?: string
}


type TraitCardProps = (BasicTrait | NumberTrait) & {
    imageUrl?: string,
    value?: string,
}   

interface TraitOptionProps extends TraitOption {
    imageUrl?: string
}


export type {Trait, BasicTrait, NumberTrait, AnyTrait, TraitOption, TraitCardProps, TraitOptionProps}
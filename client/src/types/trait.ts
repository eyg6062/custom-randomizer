import { TraitType } from "./traitType";

interface Trait {
    traitType: TraitType,
    id: string,
    name: string,
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

interface EditTraitDto {
    traitType: TraitType,
    name?: string
}

interface EditNumberTraitDto extends EditTraitDto {
    minNum?: number,
    maxNum?: number,
}

type CreateTraitDto = Omit<Trait, 'id'>
type CreateNumberTraitDto = Omit<CreateTraitDto & NumberTrait, 'id'>
type CreateAnyTraitDto = CreateTraitDto | CreateNumberTraitDto

type TraitCardProps = (BasicTrait | NumberTrait) & {
    imageUrl?: string,
    value?: string,
}   

interface TraitOptionProps extends TraitOption {
    imageUrl?: string
}


export type {Trait, BasicTrait, NumberTrait, AnyTrait, TraitOption, TraitCardProps, TraitOptionProps, EditTraitDto, EditNumberTraitDto, CreateTraitDto, CreateNumberTraitDto, CreateAnyTraitDto}
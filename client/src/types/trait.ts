import { TraitOption } from "./traitOption";
import { TraitType } from "./traitType";

interface Trait {
    traitType: TraitType,
    id: string,
    name: string,
    randomizerId: string
}

interface BasicTrait extends Trait {
    traitOptions: TraitOption[]
}

interface NumberTrait extends Trait {
    minNum: number,
    maxNum: number,
}

type AnyTrait = BasicTrait | NumberTrait;

interface EditTraitDto {
    traitType: TraitType,
    name?: string,
    randomizerId: string
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


export type {Trait, BasicTrait, NumberTrait, AnyTrait, TraitCardProps, EditTraitDto, EditNumberTraitDto, CreateTraitDto, CreateNumberTraitDto, CreateAnyTraitDto}
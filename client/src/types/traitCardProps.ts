import { TraitType } from "./traitType";

export interface TraitCardProps {
    id: string,
    name: string,
    traitType: TraitType,
    imageUrl?: string,
    value?: string,
}   
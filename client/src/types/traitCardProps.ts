import { TraitType } from "./traitType";

export interface TraitCardProps {
    id: number,
    name: string,
    traitType: TraitType,
    imageUrl?: string,
    value?: string,
    onCardClick: (traitId: number) => void;
}   
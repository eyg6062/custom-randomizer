import { BasicTrait, NumberTrait, Trait, TraitOption } from "../types/trait";
import { TraitCardProps } from "../types/traitCardProps";
import { TraitType } from "../types/traitType";

function randomizeTrait(traitData: Trait, trait: TraitCardProps) : TraitCardProps {

    switch (trait.traitType) {
        case TraitType.Basic:
            const traitOption = randomizeBasicTrait(traitData as BasicTrait);
            return {...trait, imageUrl: traitOption.imageUrl, value: traitOption.text};
        case TraitType.Number:
            const numVal = randomizeNumberTrait(traitData as NumberTrait);
            return {...trait, value: String(numVal)};
        case TraitType.Color:
            // todo: add color in
            return {...trait};
        default:
            console.log("no trait type match");
            return trait;
    }

}

function randomizeBasicTrait(trait: BasicTrait): TraitOption {
    const traitOptions = trait.traitOptions;
    return traitOptions[getRandomInt(0, traitOptions.length - 1)];
}

function randomizeNumberTrait(trait: NumberTrait) {
    const min = trait.minNum;
    const max = trait.maxNum;
    return getRandomInt(min, max);
}

function randomizeColorTrait() {
    return;
}

function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {randomizeTrait, randomizeBasicTrait, randomizeNumberTrait, randomizeColorTrait}
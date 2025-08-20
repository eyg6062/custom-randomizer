import { getImageUrl } from "../api/imageUpload";
import { BasicTrait, NumberTrait, Trait, TraitOption, TraitOptionProps } from "../types/trait";
import { TraitCardProps } from "../types/trait";
import { TraitType } from "../types/traitType";

async function randomizeTrait(traitData: Trait, trait: TraitCardProps) : Promise<TraitCardProps> {

    switch (trait.traitType) {
        case TraitType.Basic:
            const traitOptionProps = await randomizeBasicTrait(traitData as BasicTrait);
            return {...trait, imageUrl: traitOptionProps.imageUrl, value: traitOptionProps.text};
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

async function randomizeBasicTrait(trait: BasicTrait): Promise<TraitOptionProps> {
    const traitOptions = trait.traitOptions;
    const option = traitOptions[getRandomInt(0, traitOptions.length - 1)];

    // get image url
    let imageUrl;
    if (option.imageKey) {
        const response = await getImageUrl(option.imageKey);
        imageUrl = response.url;
    }

    const optionProps : TraitOptionProps = {...traitOptions, imageUrl: imageUrl}
    return optionProps;
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
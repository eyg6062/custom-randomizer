import { getImageUrl } from "../api/imageUpload";
import { AnyTrait, BasicTrait, NumberTrait } from "../types/trait";
import { TraitOptionProps } from "../types/traitOption";
import { TraitCardProps } from "../types/trait";
import { TraitType } from "../types/traitType";

async function randomizeTrait(trait: AnyTrait) : Promise<TraitCardProps> {

    switch (trait.traitType) {
        case TraitType.Basic:
            const traitOptionProps = await randomizeBasicTrait(trait as BasicTrait);
            return {...trait, imageUrl: traitOptionProps.imageUrl, value: traitOptionProps.text};
        case TraitType.Number:
            const numVal = randomizeNumberTrait(trait as NumberTrait);
            return {...trait, value: String(numVal)};
        case TraitType.Color:
            // todo: add color in
            return {...trait};
        default:
            console.log("no trait type match");
            return trait;
    }

}

async function randomizeBasicTrait(trait: BasicTrait): Promise<Omit<TraitOptionProps, "id">> {
    const traitOptions = trait.traitOptions;

    if (traitOptions.length === 0) {
        console.log("trait has no options")
        return {};
    } 

    const option = traitOptions[getRandomInt(0, traitOptions.length - 1)];

    // get image url
    let imageUrl;
    if (option.imageKey) {
        const response = await getImageUrl(option.imageKey);
        imageUrl = response.url;
    }

    const optionProps : TraitOptionProps = {...option, imageUrl: imageUrl}
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
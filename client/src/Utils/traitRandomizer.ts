import { BasicTrait, NumberTrait, TraitOption } from "../types/trait";

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

export {randomizeBasicTrait, randomizeNumberTrait, randomizeColorTrait}
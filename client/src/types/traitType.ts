export enum TraitType {
    Basic,
    Number,
    Color
}

export const typeLabelMap : Record<string, TraitType> = {
    ["Basic"]: TraitType.Basic,
    ["Number"]: TraitType.Number,
    ["Color"]: TraitType.Color,
};

export const reverseTypeLabelMap: Record<string, string> = Object.fromEntries(
    Object.entries(typeLabelMap).map(([key, value]) => [value, key])
);
import { RandomizerCardProps } from "./randomizer"
import { AnyTrait } from "./trait"

type ItemType = RandomizerCardProps | AnyTrait | undefined;

type ModalProps<T extends ItemType> = {
    data?: T | undefined;
    opened: boolean;
    close: () => void;
};

export type {ItemType, ModalProps}
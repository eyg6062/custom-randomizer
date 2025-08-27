import { Button, Group, Modal, NativeSelect, NumberInput, TextInput } from "@mantine/core"
import { useState } from "react";
import { ItemType, ModalProps } from "../types/modalProps";
import { TraitType } from "../types/traitType";
import { CreateAnyTraitDto, CreateNumberTraitDto, CreateTraitDto } from "../types/trait";

export interface CreateTraitProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, data: CreateAnyTraitDto) => Promise<void>
}

function CreateTraitModal({ opened, close, handleSubmit } : ModalProps<ItemType> & CreateTraitProps) {
    const [nameInput, setNameInput] = useState<string>('');
    const [typeInput, setTypeInput] = useState<TraitType>(TraitType.Basic);

    const [minInput, setMinInput] = useState<string | number>('');
    const [maxInput, setMaxInput] = useState<string | number>('');

    const resetValues = () => {
        setNameInput('');
        setTypeInput(TraitType.Basic);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const data: CreateTraitDto = {traitType: typeInput, name: nameInput};

        let result: CreateAnyTraitDto;
        switch (typeInput) {
            case TraitType.Basic:
                result = {...data};
                break;
            case TraitType.Number:
                const dto: CreateNumberTraitDto = {...data, minNum: Number(minInput), maxNum: Number(maxInput)}
                result = dto;
                break;
            default:
                console.log("bad trait type");
                return;
        }

        handleSubmit(e, result);
    }

    const typeLabelMap: Record<string, TraitType> = {
        ["Basic"]: TraitType.Basic,
        ["Number"]: TraitType.Number,
        //["Color"]: TraitType.Color,
    };

    const reverseTypeLabelMap: Record<string, string> = Object.fromEntries(
        Object.entries(typeLabelMap).map(([key, value]) => [value, key])
    );

    const selectTypeInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectValue = e.currentTarget.value;
        setTypeInput(typeLabelMap[selectValue]);
    }

    const numberTraitForm = (
        <Group>
            <NumberInput
                label="Min number"
                value={minInput}
                onChange={setMinInput}
            />

            <NumberInput
                label="Max number"
                value={maxInput}
                onChange={setMaxInput}
            />
        </Group>
    )

    const renderTraitTypeForm = () => {
        switch (typeInput) {
            case TraitType.Number:
                return numberTraitForm;
            default:
                return;
        }
    }

    return (
        <>
            <Modal opened={opened} onExitTransitionEnd={resetValues} onClose={close} title={"Create a new trait"} centered>
                <form onSubmit={onSubmit}>
                    <TextInput
                        label="Name"
                        value={nameInput}
                        onChange={(event) => setNameInput(event.currentTarget.value)}
                        data-autofocus
                    />

                    <NativeSelect
                        value={reverseTypeLabelMap[typeInput]}
                        onChange={selectTypeInput}
                        data={Object.keys(typeLabelMap)}
                    />

                    {renderTraitTypeForm()}

                    <Button type="submit" variant="default">Submit</Button>
                </form>
            </Modal>
        </>
    )
}

export default CreateTraitModal
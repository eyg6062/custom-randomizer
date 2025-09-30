import { Button, Group, Modal, NativeSelect, NumberInput, TextInput } from "@mantine/core"
import { useState } from "react";
import { ItemType, ModalProps } from "../../types/modalProps";
import { reverseTypeLabelMap, TraitType, typeLabelMap } from "../../types/traitType";
import { CreateAnyTraitDto } from "../../types/trait";

export interface CreateTraitProps {
    handleSubmit: (data: ModalCreateAnyTraitDto) => Promise<void>
}

export type ModalCreateAnyTraitDto = Omit<CreateAnyTraitDto, "randomizerId">

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
        e.preventDefault();

        const data: ModalCreateAnyTraitDto = {traitType: typeInput, name: nameInput};

        let result: ModalCreateAnyTraitDto;
        switch (typeInput) {
            case TraitType.Basic:
                result = {...data};
                break;
            case TraitType.Number:
                if (minInput > maxInput) {
                    console.log("minNum can't be greater than maxNum");
                    return;
                }
                const dto = {...data, minNum: Number(minInput), maxNum: Number(maxInput)}
                result = dto;
                break;
            default:
                console.log("bad trait type");
                return;
        }

        handleSubmit(result);
        close();
    }

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
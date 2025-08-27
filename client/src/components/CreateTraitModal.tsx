import { Button, Modal, TextInput } from "@mantine/core"
import { useState } from "react";
import { ItemType, ModalProps } from "../types/modalProps";
import { TraitType } from "../types/traitType";

export interface CreateTraitProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, name: string, traitType: TraitType) => Promise<void>
}

function CreateTraitModal({ opened, close, handleSubmit } : ModalProps<ItemType> & CreateTraitProps) {
    const [nameInput, setNameInput] = useState<string>('');
    const [typeInput, setTypeInput] = useState<TraitType>(TraitType.Basic);

    const resetValues = () => {
        setNameInput('');
        setTypeInput(TraitType.Basic);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        handleSubmit(e, nameInput, typeInput);
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

                    {/* add trait type selector here */}

                    <Button type="submit" variant="default">Submit</Button>
                </form>
            </Modal>
        </>
    )
}

export default CreateTraitModal
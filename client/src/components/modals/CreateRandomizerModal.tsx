import { Input, Textarea, TextInput } from "@mantine/core"
import { useState } from "react";
import { ImageDropzone } from "../ImageDropzone";
import { ItemType, ModalProps } from "../../types/modalProps";
import BaseFormModal from "./BaseFormModal";

export interface CreateRandomizerProps {
    handleSubmit: (name: string, description: string, image: File | undefined) => Promise<void>
}

function CreateRandomizerModal({ opened, close, handleSubmit } : ModalProps<ItemType> & CreateRandomizerProps) {
    const [nameInput, setNameInput] = useState<string>('');
    const [descInput, setDescInput] = useState<string>('');
    const [imageInput, setImageInput] = useState<File>();

    const resetValues = () => {
        setNameInput('');
        setDescInput('');
        setImageInput(undefined);
    }

    const onSubmit = async () => {
        await handleSubmit(nameInput, descInput, imageInput);
    }

    return (
        <BaseFormModal opened={opened} close={close} title={"Create a new randomizer:"} submitFn={onSubmit} reset={resetValues}>
            <TextInput
                label="Name"
                value={nameInput}
                onChange={(event) => setNameInput(event.currentTarget.value)}
                data-autofocus
            />

            <Input.Wrapper label="Image">
                <ImageDropzone
                    file={imageInput}
                    onFileChange={setImageInput}
                />
            </Input.Wrapper>

            <Textarea
                label="Description"
                value={descInput}
                onChange={(event) => setDescInput(event.currentTarget.value)}
            />
        </BaseFormModal>
    )
}

export default CreateRandomizerModal
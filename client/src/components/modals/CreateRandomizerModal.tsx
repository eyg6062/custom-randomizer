import { Button, Modal, Textarea, TextInput } from "@mantine/core"
import { useState } from "react";
import { ImageDropzone } from "../ImageDropzone";
import { ItemType, ModalProps } from "../../types/modalProps";

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

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(nameInput, descInput, imageInput);
        close();
    }

    return (
        <>
            <Modal opened={opened} onExitTransitionEnd={resetValues} onClose={close} title={"Create a new randomizer"} centered>
                <form onSubmit={onSubmit}>
                    <TextInput
                        label="Name"
                        value={nameInput}
                        onChange={(event) => setNameInput(event.currentTarget.value)}
                        data-autofocus
                    />

                    <ImageDropzone
                        file={imageInput}
                        onFileChange={setImageInput}
                    />

                    <Textarea
                        label="Description"
                        value={descInput}
                        onChange={(event) => setDescInput(event.currentTarget.value)}
                    />

                    <Button type="submit" variant="default">Submit</Button>
                </form>
            </Modal>
        </>
    )
}

export default CreateRandomizerModal
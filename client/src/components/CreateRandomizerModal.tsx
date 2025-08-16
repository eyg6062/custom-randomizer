import { Button, Modal, Textarea, TextInput } from "@mantine/core"
import { useState } from "react";
import { ImageDropzone } from "./ImageDropzone";

interface CreateRandomizerProps {
    opened: boolean,
    close: () => void,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, name: string, description: string, image: File | undefined) => Promise<void>
}

function CreateRandomizerModal({ opened, close, handleSubmit } : CreateRandomizerProps) {
    const [nameInput, setNameInput] = useState<string>('');
    const [descInput, setDescInput] = useState<string>('');
    const [imageInput, setImageInput] = useState<File>();

    const resetValues = () => {
        setNameInput('');
        setDescInput('');
        setImageInput(undefined);
    }

    return (
        <>
            <Modal opened={opened} onExitTransitionEnd={resetValues} onClose={close} title={"Create a new randomizer"} centered>
                <form onSubmit={(e) => {handleSubmit(e, nameInput, descInput, imageInput)}}>
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
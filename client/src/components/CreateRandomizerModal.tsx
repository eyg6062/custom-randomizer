import { Button, Modal, Textarea, TextInput } from "@mantine/core"
import { useRef, useState } from "react";

interface CreateRandomizerProps {
    opened: boolean,
    close: () => void,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, name: string, description: string) => Promise<void>
}

function CreateRandomizerModal({ opened, close, handleSubmit } : CreateRandomizerProps) {
    const [nameInput, setNameInput] = useState('');
    const [descInput, setDescInput] = useState('');

    const resetValues = () => {
        setNameInput('');
        setDescInput('');
    }

    return (
        <>
            <Modal opened={opened} onExitTransitionEnd={resetValues} onClose={close} title={"Create a new randomizer"} centered>
                <form onSubmit={(e) => {handleSubmit(e, nameInput, descInput)}}>
                    <TextInput
                        label="Name"
                        value={nameInput}
                        onChange={(event) => setNameInput(event.currentTarget.value)}
                        data-autofocus
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
import { Button, Modal, TextInput } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { RandomizerCardProps } from "../types/randomizer";

interface RenameProps {
    randProps: RandomizerCardProps | undefined
    opened: boolean,
    close: () => void,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string) => Promise<void>
}

function RenameModal({randProps, opened, close, handleSubmit} : RenameProps) {
    const [renameInput, setRenameInput] = useState('');
    const renameInputRef = useRef<HTMLInputElement>(null);

    // When modal opens, set input value and select text
    useEffect(() => {
        if (opened) {
            if (!randProps) {
                return;
            }
            setRenameInput(randProps.name);

            setTimeout(() => {
                renameInputRef.current?.select();
            }, 0);
        }
    }, [opened, randProps]);

    return (
        
        <Modal opened={opened} onClose={close} title={"Enter a new name:"} centered>
            <form onSubmit={(e) => {handleSubmit(e, renameInput)}}>
                <TextInput
                    ref={renameInputRef}
                    value={renameInput}
                    onChange={(event) => setRenameInput(event.currentTarget.value)}
                    data-autofocus
                />
                <Button type="submit" variant="default">Submit</Button>
            </form>
        </Modal>
    )

}

export default RenameModal
import { Button, Modal, TextInput } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { ItemType, ModalProps } from "../types/modalProps";

export interface RenameModalProps {
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, text: string) => Promise<void>
}

function RenameModal({data, opened, close, handleSubmit} : ModalProps<ItemType> & RenameModalProps) {
    const [renameInput, setRenameInput] = useState('');
    const renameInputRef = useRef<HTMLInputElement>(null);

    // When modal opens, set input value and select text
    useEffect(() => {
        if (opened) {
            if (!data) {
                return;
            }
            setRenameInput(data.name);

            setTimeout(() => {
                renameInputRef.current?.select();
            }, 0);
        }
    }, [opened, data]);

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
import { TextInput } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { ItemType, ModalProps } from "../../types/modalProps";
import BaseFormModal from "./BaseFormModal";

export interface RenameModalProps {
    handleSubmit: (data: ItemType, text: string) => Promise<void>
}

function RenameModal({data, opened, close, handleSubmit} : ModalProps<ItemType> & RenameModalProps) {
    const [renameInput, setRenameInput] = useState('');
    const renameInputRef = useRef<HTMLInputElement>(null);

    // When modal opens, set input value and select text
    useEffect(() => {
        if (opened && data) {
            setRenameInput(data.name);
            setTimeout(() => renameInputRef.current?.select(), 0);
        }
    }, [opened, data]);

    return (
        <BaseFormModal opened={opened} close={close} title={"Enter a new name:"} submitFn={() => handleSubmit(data, renameInput)}>
            <TextInput
                ref={renameInputRef}
                value={renameInput}
                onChange={(event) => setRenameInput(event.currentTarget.value)}
                data-autofocus
            />
        </BaseFormModal>
    )
}

export default RenameModal
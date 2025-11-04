import { Textarea } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { ItemType, ModalProps } from "../../types/modalProps";
import { RandomizerCardProps } from "../../types/randomizer";
import BaseFormModal from "./BaseFormModal";

export interface EditDescModalProps {
    handleSubmit: (item: ItemType, text: string) => Promise<void>
}

function EditDescModal({data, opened, close, handleSubmit} : ModalProps<ItemType> & EditDescModalProps) {
    const [descInput, setDescInput] = useState('');
    const descInputRef = useRef<HTMLTextAreaElement>(null);

    // When modal opens, set input value and select text
    
    useEffect(() => {
        if (opened) {
            if (!data) return;

            const randData = data as RandomizerCardProps;

            if (randData.description) setDescInput(randData.description);

            setTimeout(() => {
                descInputRef.current?.select();
            }, 0);
        }
    }, [opened, data]);
    
    const onSubmit = async () => {
        await handleSubmit(data, descInput);
    }

    return (
        <BaseFormModal opened={opened} close={close} title={"Edit description:"} submitFn={onSubmit}>
            <Textarea
                ref={descInputRef}
                value={descInput}
                onChange={(event) => setDescInput(event.currentTarget.value)}
                data-autofocus
            />
        </BaseFormModal>
    )

}

export default EditDescModal
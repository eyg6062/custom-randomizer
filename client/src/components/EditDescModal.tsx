import { Button, Modal, Textarea } from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { ItemType, ModalProps } from "../types/modalProps";
import { RandomizerCardProps } from "../types/randomizer";

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
    
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(data, descInput);
        close();
    }

    return (
        
        <Modal opened={opened} onClose={close} title={"Enter description:"} centered>
            <form onSubmit={onSubmit}>
                <Textarea
                    ref={descInputRef}
                    value={descInput}
                    onChange={(event) => setDescInput(event.currentTarget.value)}
                    data-autofocus
                />
                <Button type="submit" variant="default">Submit</Button>
            </form>
        </Modal>
    )

}

export default EditDescModal
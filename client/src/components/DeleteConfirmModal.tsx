import { Button, Group, Modal } from "@mantine/core";
import { ItemType, ModalProps } from "../types/modalProps";

export interface DeleteConfirmProps {
    handleSubmit: (item: ItemType) => Promise<void>
}

function DeleteConfirmModal({data, opened, close, handleSubmit} : ModalProps<ItemType> & DeleteConfirmProps) {

    return (
        <Modal opened={opened} onClose={close} title={"Are you sure you want to delete?"} centered>
            <Group>
                <Button onClick={close} variant="default">Cancel</Button>
                <Button onClick={() => { handleSubmit(data); close()}} variant="default">Delete</Button>
            </Group> 
        </Modal>
    )
}

export default DeleteConfirmModal
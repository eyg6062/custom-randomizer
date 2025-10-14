import { useState } from "react";
import { ImageDropzone } from "../ImageDropzone";
import { Button, Modal } from "@mantine/core";
import { ItemType, ModalProps } from "../../types/modalProps";

export interface EditImageProps {
    handleSubmit: (data: ItemType, image: File | undefined) => Promise<void>
}

function EditImageModal({data, opened, close, handleSubmit} : ModalProps<ItemType> & EditImageProps) {

    const [imageInput, setImageInput] = useState<File>();

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleSubmit(data, imageInput);
        close();
    }

    return (
        <Modal opened={opened} onExitTransitionEnd={() => setImageInput(undefined)} onClose={close} title={"Edit Thumbnail"} centered>
            <form onSubmit={onSubmit}>
                <ImageDropzone
                    file={imageInput}
                    onFileChange={setImageInput}
                />

                <Button type="submit" disabled={!imageInput} variant="default">Submit</Button>
            </form>
        </Modal>
    )
}

export default EditImageModal
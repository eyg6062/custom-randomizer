import { useState } from "react";
import { ImageDropzone } from "../ImageDropzone";
import { ItemType, ModalProps } from "../../types/modalProps";
import BaseFormModal from "./BaseFormModal";

export interface EditImageProps {
    handleSubmit: (data: ItemType, image: File | undefined) => Promise<void>
}

function EditImageModal({data, opened, close, handleSubmit} : ModalProps<ItemType> & EditImageProps) {

    const [imageInput, setImageInput] = useState<File>();

    const onSubmit = async () => {
        await handleSubmit(data, imageInput);
    }

    return (
        <BaseFormModal opened={opened} close={close} title={"Edit image:"} submitFn={onSubmit} reset={() => setImageInput(undefined)}>
            <ImageDropzone
                file={imageInput}
                onFileChange={setImageInput}
            />
        </BaseFormModal>
    )
}

export default EditImageModal
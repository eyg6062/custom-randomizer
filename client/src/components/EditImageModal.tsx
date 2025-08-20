import { useState } from "react";
import { ImageDropzone } from "./ImageDropzone";
import { Button, Modal } from "@mantine/core";

interface EditImageProps {
    opened: boolean,
    close: () => void,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>, image: File | undefined) => Promise<void>
}

function EditImageModal({opened, close, handleSubmit} : EditImageProps) {

    const [imageInput, setImageInput] = useState<File>();

    return (
        <Modal opened={opened} onExitTransitionEnd={() => setImageInput(undefined)} onClose={close} title={"Edit Thumbnail"} centered>
            <form onSubmit={(e) => {handleSubmit(e, imageInput)}}>
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
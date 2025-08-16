import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { Text, Image, Group } from "@mantine/core";
import { IconPhoto } from '@tabler/icons-react';

interface ImageDropzoneProps {
    file: File | undefined,
    onFileChange: (file: File) => void
}

export function ImageDropzone({file, onFileChange} : ImageDropzoneProps) {

    const handleDrop = (files: FileWithPath[]) => {
        onFileChange(files[0] as File);
    }

    const imagePreview = () => { 
        console.log((file as File).name)
        console.log((file as File).type)

        return (
        <Image 
            src={URL.createObjectURL(file as File)}
            fit="contain"
            height={240}
        />
    )}

    return (
        <Dropzone accept={IMAGE_MIME_TYPE} onDrop={handleDrop}>
            <Group>
                <IconPhoto/>
                <Text>Select or drop image here</Text>
            </Group>
            {file && imagePreview()}
        </Dropzone>
    )
}
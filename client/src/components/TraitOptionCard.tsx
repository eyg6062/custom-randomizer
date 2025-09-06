import { Card, Image } from "@mantine/core"
import { TraitOptionProps } from "../types/traitOption"
import { Dropzone, FileWithPath, IMAGE_MIME_TYPE } from "@mantine/dropzone"
import { IconPhoto, IconTrash } from "@tabler/icons-react"
import CircleButton from "./CircleButton"
import InlineTextEditor from "./InlineTextEditor"


interface TraitOptionCardProps extends TraitOptionProps {
    handleDropImage: (file: File, option: TraitOptionProps) => void,
    handleEditText: (text: string, option: TraitOptionProps) => void,
    handleDelete: (option: TraitOptionProps) => void
}

export function TraitOptionCard (props: TraitOptionCardProps) {


    const handleDrop = (files: FileWithPath[]) => {
        props.handleDropImage(files[0] as File, props)
    }

    const handleReject = () => {
        console.log("file rejected, over 5mb")
    }

    const handleEnterText = (text: string) => {
        props.handleEditText(text, props);
    }

    return (
        <>
    
        <Card padding="xs" radius="md" withBorder style={{ minWidth: 300, maxWidth: 300 }}>
            
            <Dropzone 
                accept={IMAGE_MIME_TYPE} 
                onDrop={handleDrop} 
                multiple={false}
                maxSize={5 * 1024 * 1024}
                onReject={handleReject}
            >
                {props.imageUrl ? (
                <Image
                    src={props.imageUrl}
                    fit="contain"
                    height={160}
                    width="100%"
                />
                ) 
                : <IconPhoto/>}
                
            </Dropzone>

            <InlineTextEditor
                initialText={props.text}
                handleEnterText={handleEnterText}
            />

            <div style={{display:"flex", justifyContent:"flex-end", alignItems:"flex-end", height:"100%"}}>
            <CircleButton
                icon={IconTrash}
                onClick={() => props.handleDelete(props)}
            />
            </div>

        </Card>

        </>
    )
}
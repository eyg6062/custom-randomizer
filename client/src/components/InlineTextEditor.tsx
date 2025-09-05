import { Text, Textarea} from "@mantine/core"
import { useEffect, useRef, useState } from "react";
import { useMantineTheme } from "@mantine/core";

interface InlineTextEditorProps {
    initialText?: string,
    handleEnterText: (text: string) => void
}

function InlineTextEditor({initialText, handleEnterText}: InlineTextEditorProps) {
    const theme = useMantineTheme();
    const [textValue, setTextValue] = useState<string>(initialText ? initialText : "")
    const [editing, setEditing] = useState<boolean>(false);
    const [hover, setHover] = useState<boolean>(false);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (editing && inputRef.current) {
            inputRef.current.select();
        }

    }, [editing])

    const handleSubmitEdit = () => {
        setEditing(false);
        setHover(false);

        if (!textValue?.trim()) {
            setTextValue("(Enter text)")
            handleEnterText("(Enter text)");
        } else {
            handleEnterText(textValue);
        } 
    }

    const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.blur();
        }
    }

    const editNode = (
        <Textarea
            variant="default"
            value={textValue}
            onChange={(event) => setTextValue(event.currentTarget.value)}
            onClick={() => setEditing(true)}
            onKeyDown={(e) => handleEnter(e)}
            onBlur={handleSubmitEdit}
            ref={inputRef}
            autosize
        />
    )    

    const viewNodeStyle = {
        padding: hover ? '2px 6px' : '3px 7px',
        display: "inline-block",
        border: hover ? `1px solid ${theme.colors.gray[6]}` : "none",
        borderRadius: hover ? theme.radius.sm : "0",
    }

    const viewNode = (
        <div
            style={viewNodeStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => setEditing(true)}
        >
            <Text style={{whiteSpace: "pre-wrap"}}>
                {initialText}
            </Text>
        </div>
    )

    return (
        <>
        {editing ? editNode : viewNode}
        </>
    )
}

export default InlineTextEditor
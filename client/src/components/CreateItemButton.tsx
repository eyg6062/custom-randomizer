import { ActionIcon, Tooltip } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"

interface Props {
    onClick: () => void,
    toolTipLabel: string
}

function CreateItemButton(props: Props) {

    return (
        <Tooltip label={props.toolTipLabel} openDelay={500} withArrow arrowSize={8} position="bottom">
            <ActionIcon onClick={props.onClick} variant="default" radius="xl" size="lg">
                <IconPlus size={24} />
            </ActionIcon>
        </Tooltip>
    )
}

export default CreateItemButton
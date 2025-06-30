import { Card, Group, Text } from "@mantine/core";
import { TraitType } from "../types/traitType";
import { TraitCardProps } from "../types/traitCardProps";

function BasicContent(props: TraitCardProps) {
    return <Text style={{justifyContent: "center", alignItems: "center"}}>{`basic, value: ${props.value}`}</Text>
}

function NumberContent(props: TraitCardProps) {
    return (
        <Group justify="center" align="center">
            <Text>{`number, value: ${props.value}`}</Text>
        </Group>
    )
}

function ColorContent() {
    return <p>color</p>
}


export function TraitCard (props: TraitCardProps) {

    let content;
    switch (props.traitType) {
        case TraitType.Basic:
            content = BasicContent(props);
            break;
        case TraitType.Number:
            content = NumberContent(props);
            break;
        case TraitType.Color:
            content = ColorContent();
            break;
    }
    
    return (
        <Card padding="xs" radius="md" withBorder style={{ minWidth: 300, maxWidth: 300 }}>
            <Card.Section style={{ minHeight: 160, maxHeight: 160 }}>
                {content}
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Text>{props.name}</Text>
            </Group>
        </Card>
    )
}
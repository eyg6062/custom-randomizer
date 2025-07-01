import { Card, Group, Text, Center } from "@mantine/core";
import { TraitType } from "../types/traitType";
import { TraitCardProps } from "../types/traitCardProps";

function BasicContent(props: TraitCardProps) {
    return (
        <Text>{`basic, value: ${props.value}`}</Text>
    )
}

function NumberContent(props: TraitCardProps) {
    return (
        <Text>{`number, value: ${props.value}`}</Text>
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
                <Center style={{width:"100%", height:"100%"}}>
                    {content}
                </Center>
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Text>{props.name}</Text>
            </Group>
        </Card>
    )
}
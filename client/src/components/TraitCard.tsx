import { Card, Group, Text, Center, Image, UnstyledButton, Flex } from "@mantine/core";
import { TraitType } from "../types/traitType";
import { TraitCardProps } from "../types/trait";

interface TraitCardPropsWithFunction extends TraitCardProps {
    onCardClick: (id: number) => void
}

function BasicContent(props: TraitCardProps) {
    return (
        <Flex
            direction="column"
            align="center"
            justify="flex-start"
            style={{
                width: '100%',
                height: '100%',
            }}
        >
            {props.imageUrl ? (
                <Image
                    src={props.imageUrl}
                    fit="contain"
                    height="100%"
                    width="100%"
                />
            ) : null}

            <Text>{props.value}</Text>
        </Flex>
    )
}

function NumberContent(props: TraitCardProps) {
    return (
        <Text style={{ fontSize: '3rem' }}>{props.value}</Text>
    )
}

function ColorContent() {
    return <p>color</p>
}


export function TraitCard (props: TraitCardPropsWithFunction) {

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
        <UnstyledButton onClick={ () => props.onCardClick(props.id) }  style={{ display: 'block', height: '100%' }}>
        
            <Card padding="xs" radius="md" withBorder style={{ minWidth: 300, maxWidth: 300 }}>
                <Card.Section style={{ height: 160 }}>
                    <Center style={{width:"100%", height:"100%"}}>
                        {content}
                    </Center>
                </Card.Section>
                <Group justify="space-between" p={0} mt="md">
                    <Text>{props.name}</Text>
                </Group>
            </Card>
        
        </UnstyledButton>
    )
}
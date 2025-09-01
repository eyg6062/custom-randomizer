import { Card, Group, Image, Text } from "@mantine/core"
import { TraitOptionProps } from "../types/trait"

/*
interface TraitOptionCardProps extends TraitOptionProps {
    //
}
*/

export function TraitOptionCard (props: TraitOptionProps) {
    return (
        <>
    
        <Card padding="xs" radius="md" withBorder style={{ minWidth: 300, maxWidth: 300 }}>
            
            <Card.Section style={{ height: 160 }}>
                {props.imageUrl ? (
                    <Image
                        src={props.imageUrl}
                        fit="contain"
                        height="100%"
                        width="100%"
                    />
                ) : null}
            </Card.Section>

            <Group justify="space-between" p={0} mt="md">
                <Text>{props.text}</Text>

            </Group>

        </Card>

        </>
    )
}
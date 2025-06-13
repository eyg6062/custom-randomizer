import { NavLink } from "react-router"
import { ReactNode } from "react"
import { Card, Group, Text, Image, Menu, Button } from "@mantine/core"
import reactLogo from '../assets/react.svg'

//import './RandomizerCard.css'

interface RandomizerCardProps {
    title: string,
    imageUrl?: string
}

function RandomizerCard (props: RandomizerCardProps, menu: ReactNode = null) {
    const imageUrl = (props.imageUrl == null) ? reactLogo : props.imageUrl;

    return (
        <Card padding="xs" radius="md" withBorder style={{ maxWidth: 300 }}>
            <Card.Section>
                <Image 
                src={imageUrl}
                height={160}
                />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Text>{props.title}</Text>
                <>{menu}</>
            </Group>
        </Card>
    )
}

export function RandomizerCardEdit (props: RandomizerCardProps) {
    const menu = (
        <Menu shadow="xs" width={100}>
            <Menu.Target>
                <Button>Toggle menu</Button>
            </Menu.Target>

            <Menu.Dropdown>
                <Menu.Item>Rename</Menu.Item>
                <Menu.Item>Edit</Menu.Item>
                <Menu.Item>Delete</Menu.Item>
            </Menu.Dropdown>
        </Menu>
    )

    return RandomizerCard(props, menu)
}

export function RandomizerCardPublic (props: RandomizerCardProps) {
    return RandomizerCard(props)
}

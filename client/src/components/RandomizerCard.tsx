import { NavLink } from "react-router"
//import './RandomizerCard.css'

import { Card, Group, Text, Image, Menu, Button } from "@mantine/core"
import { ReactNode } from "react"

interface RandomizerCardProps {
    imageUrl: string,
    title: string,
    menu: ReactNode
}

function RandomizerCard (props: RandomizerCardProps) {
    return (
        <Card padding="xs" radius="md" withBorder style={{ maxWidth: 300 }}>
            <Card.Section>
                <Image 
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png" 
                height={160}
                />
            </Card.Section>
            <Group justify="space-between" mt="md" mb="xs">
                <Text>Title</Text>
                <>{props.menu}</>
            </Group>
        </Card>
    )
}

function RandomizerCardEdit (props: RandomizerCardProps) {
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

    return (
        <RandomizerCard
            {...props}
            menu={menu} 
        />
    )
}

function RandomizerCardPublic () {
    return
}

export default { RandomizerCard, RandomizerCardEdit }
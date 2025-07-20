import { NavLink } from "react-router"
import { ReactNode } from "react"
import { Card, Group, Text, Image, Menu } from "@mantine/core"
import reactLogo from '../assets/react.svg'
import { Randomizer } from "../types/randomizer"
import {IconDotsVertical, IconEye} from '@tabler/icons-react'
import CircleButton from "./CircleButton"

//import './RandomizerCard.css'

function RandomizerCard (props: Randomizer, menu: ReactNode = null) {
    const imageUrl = (props.imageUrl == null) ? reactLogo : props.imageUrl;

    return (
        <Card padding="xs" radius="md" withBorder style={{ minWidth: 300, maxWidth: 300 }}>
            <Card.Section>
                <Image 
                src={imageUrl}
                height={160}
                fit="contain"
                />
            </Card.Section>
            <Group justify="space-between" p={0} mt="md">
                <Text>{props.name}</Text>
                <>{menu}</>
            </Group>
        </Card>
    )
}

export function RandomizerCardEdit (props: Randomizer) {
    const menu = (
        <Group gap="xs">
            <NavLink to={`/randomizer/${props.id}`}>
                <CircleButton 
                    icon={IconEye}
                />
            </NavLink>
            {/*}
            <NavLink to={`/randomizer/${props.id}`}>
                <UnstyledButton variant="default" p={4} style={{borderRadius:'50%'}}>
                    <Center>
                        <IconEye/>
                    </Center>
                </UnstyledButton>
            </NavLink>
            */}
            <Menu shadow="xs" width={100}>
                <Menu.Target>
                    <CircleButton 
                        icon={IconDotsVertical}
                    />
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item>Rename</Menu.Item>
                    <Menu.Item>Edit</Menu.Item>
                    <Menu.Item>Delete</Menu.Item>
                </Menu.Dropdown>
            </Menu>
        </Group>
        
    )

    return RandomizerCard(props, menu)
}

export function RandomizerCardPublic (props: Randomizer) {
    return (
        <NavLink to={`/randomizer/${props.id}`}>
            {RandomizerCard(props)}
        </NavLink>
    )
}

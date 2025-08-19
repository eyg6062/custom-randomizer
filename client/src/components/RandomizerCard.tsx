import { NavLink, useNavigate } from "react-router"
import { ReactNode } from "react"
import { Card, Group, Text, Image, Menu } from "@mantine/core"
import diceIcon from '../assets/dice.png'
import { Randomizer, RandomizerCardEditProps, RandomizerCardProps } from "../types/randomizer"
import {IconDotsVertical, IconEye} from '@tabler/icons-react'
import CircleButton from "./CircleButton"

function RandomizerCard (props: RandomizerCardProps, menu: ReactNode = null) {
    const imageUrl = props.preSignedUrl;

    return (
        <Card padding="xs" radius="md" withBorder style={{ minWidth: 300, maxWidth: 300 }}>
            <Card.Section>
                <Image 
                src={imageUrl ? imageUrl : diceIcon}
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

export function RandomizerCardEdit (props: RandomizerCardEditProps) {
    const navigate = useNavigate();

    const handlePublicViewClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        navigate(`/randomizer/${props.id}`);
    } 

    const handleEditViewClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        navigate(`/randomizer/${props.id}/edit`);
    } 

    const menu = (
        <Group gap="xs">


            <CircleButton 
                icon={IconEye}
                onClick={handlePublicViewClick}
            />

            <div onClick={(e) => {e.stopPropagation()}}>
            <Menu shadow="xs" position="bottom-start" width="dropdown">
                <Menu.Target>
                    <CircleButton 
                        icon={IconDotsVertical}
                    />
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={ () => props.onRenameClick(props.id, props.name) }>Rename</Menu.Item>
                    <Menu.Item onClick={ () => props.onEditThumbClick(props.id) }>Edit thumbnail</Menu.Item>
                    <Menu.Item onClick={ () => props.onDeleteClick(props.id) }>Delete</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            </div>

        </Group>
    )

    return ( 
        <div onClick={handleEditViewClick} style={{cursor: "pointer"}}>
            {RandomizerCard(props, menu)} 
        </div>
    ) 
}

export function RandomizerCardPublic (props: Randomizer) {
    return (
        <NavLink to={`/randomizer/${props.id}`}>
            {RandomizerCard(props)}
        </NavLink>
    )
}

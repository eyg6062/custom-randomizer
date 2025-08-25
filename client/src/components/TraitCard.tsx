import { Card, Group, Text, Center, Image, Flex, Menu } from "@mantine/core";
import { TraitType } from "../types/traitType";
import { TraitCardProps } from "../types/trait";
import { ReactNode } from "react";
import CircleButton from "./CircleButton";
import { IconDotsVertical, IconPencil } from "@tabler/icons-react";


type TraitCardPropsWithFunction = TraitCardProps & {
    onCardClick: (id: string) => void
}

type TraitCardEditPropsWithFunction = TraitCardPropsWithFunction & {
    onRenameClick: (id: string, prevName: string) => void,
    onDeleteClick: (id: string) => void,
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


function TraitCard (props: TraitCardPropsWithFunction, menu: ReactNode = null) {

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
        //<UnstyledButton onClick={ () => props.onCardClick(props.id) }  style={{ display: 'block', height: '100%' }}></UnstyledButton>
        <div onClick={ () => props.onCardClick(props.id) } style={{cursor: "pointer"}}>
        
            <Card padding="xs" radius="md" withBorder style={{ minWidth: 300, maxWidth: 300 }}>
                <Card.Section style={{ height: 160 }}>
                    <Center style={{width:"100%", height:"100%"}}>
                        {content}
                    </Center>
                </Card.Section>
                <Group justify="space-between" p={0} mt="md">
                    <Text>{props.name}</Text>
                    <>{menu}</>
                </Group>
            </Card>
        
        </div>
    )
}

export function TraitCardEdit(props: TraitCardEditPropsWithFunction) {
    
    const handleEditClick = () => {
        // todo: make this go to trait edit page
        console.log("edit clicked");
    }

    const menu = (
        <Group gap="xs">
            <div onClick={(e) => {e.stopPropagation()}}>
            <CircleButton 
                icon={IconPencil}
                onClick={handleEditClick}
            />

            
            <Menu shadow="xs" position="bottom-start" width="dropdown">
                <Menu.Target>
                    <CircleButton 
                        icon={IconDotsVertical}
                        
                    />
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Item onClick={ () => props.onRenameClick(props.id, props.name) }>Rename</Menu.Item>
                    <Menu.Item onClick={ () => props.onDeleteClick(props.id) }>Delete</Menu.Item>
                </Menu.Dropdown>
            </Menu>
            </div>

        </Group>
    )

    return TraitCard(props, menu);
}

export function TraitCardPublic(props: TraitCardPropsWithFunction) {
    return TraitCard(props);
}
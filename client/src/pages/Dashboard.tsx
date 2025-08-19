import { useState, useEffect, useRef } from "react";
import { CreateRandomizerDto, RandomizerCardEditProps, RandomizerCardProps } from "../types/randomizer";
import { apiDeleteRandomizer, getRandomizersWithImageUrl} from "../api/randomizer";
import CustomGrid from "../components/CustomGrid";
import { RandomizerCardEdit } from "../components/RandomizerCard";
import { createRandomizer, editRandomizerName } from "../Utils/randomizerEditor";
import { ActionIcon, Button, Group, Modal, TextInput, Tooltip } from "@mantine/core";
import {IconPlus} from '@tabler/icons-react'
import { useDisclosure } from "@mantine/hooks";
import CreateRandomizerModal from "../components/CreateRandomizerModal";
import { getImageUrl } from "../api/imageUpload";

function Dashboard () {
    const [randomizerData, setRandomizerData] = useState<RandomizerCardProps[]>([]);
    const [randomizerPropData, setRandomizerPropData] = useState<RandomizerCardEditProps[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<string>();

    // delete confirmation modal
    const [deleteConfirmOpened, { open: openDeleteConfirm, close: closeDeleteConfirm }] = useDisclosure(false);

    // edit modals
    const [editThumbOpened, { open: openEditThumb, close: closeEditThumb }] = useDisclosure(false);
    const [renameOpened, { open: openRename, close: closeRename }] = useDisclosure(false);
    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);

    // rename input value
    const [renameInput, setRenameInput] = useState('');

    const renameInputRef = useRef<HTMLInputElement>(null);


    const handleCreateSubmit = async (event: React.FormEvent<HTMLFormElement>, name: string, description: string, image: File | undefined) => {
        event.preventDefault();

        const data : CreateRandomizerDto = {
            name: name,
            imageFile: image,
            description: description
        }
        
        try {
            const response = await createRandomizer(data)
            
            let imageUrl;
            if (response.imageKey) {
                imageUrl = (await getImageUrl(response.imageKey)).url;
            }

            const newRand : RandomizerCardEditProps = {
                id: response.id,
                name: name,
                imageKey: response.imageKey,
                preSignedUrl: imageUrl,
                onRenameClick: handleRenameClick,
                onDeleteClick: handleDeleteClick,
                onEditThumbClick: handleEditThumbClick
            }
            setRandomizerPropData(prev => [...prev, newRand]);

        } catch (error) {
            console.error(`Failed to create randomizer:`, error);
        }

        closeCreate();
    }

    const handleDeleteClick = (id: string) => {
        openDeleteConfirm();
        setSelectedCardId(id);
    }

    const handleDelete = async (id?: string) => {
        if (!id) {
            console.log("no randomizer id selected");
            return;
        }
        try {
            await apiDeleteRandomizer(id);
            setRandomizerData(prev => prev.filter(randomizer => randomizer.id !== id));
        } catch (error) {
            console.error(`Failed to delete randomizer ${id}:`, error);
        }
    }

    const handleRenameClick = (id: string, prevName: string) => {
        setSelectedCardId(id);
        setRenameInput(prevName);
        openRename();
        setTimeout(() => {
            if (renameInputRef.current) {
            renameInputRef.current.select();
            }
        }, 0);
    }

    const handleSubmitRename = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (!selectedCardId) {
            console.log("no randomizer id selected");
            return;
        }

        try {
            await editRandomizerName(selectedCardId, renameInput);
            setRandomizerPropData(prev => 
                prev.map(randomizer => {
                    if (randomizer.id === selectedCardId) {
                        console.log("editing name");
                        return {...randomizer, name: renameInput};
                    }
                    else {
                        return randomizer;
                    }
                })
            );

        } catch (error) {
            console.error(`Failed to rename randomizer ${selectedCardId}:`, error);
        }

        closeRename();
    }

    const handleEditThumbClick = (id: string) => {
        openEditThumb();
        setSelectedCardId(id);
    }

    useEffect( () => {
        getRandomizersWithImageUrl()
            .then(json => setRandomizerData(json))
    }, [] );

    useEffect(() => {
        const mappedRandProps: RandomizerCardEditProps[] = randomizerData.map(randomizer => ({
            id: randomizer.id,
            name: randomizer.name,
            imageKey: randomizer.imageKey,
            preSignedUrl: randomizer.preSignedUrl,
            onRenameClick: handleRenameClick,
            onDeleteClick: handleDeleteClick,
            onEditThumbClick: handleEditThumbClick
        }));
        setRandomizerPropData(mappedRandProps)
    }, [randomizerData] );

    return (
        <>
            <Group>
                <h1>Dashboard</h1>
                <Tooltip label="Create new randomizer" openDelay={500} withArrow arrowSize={8} position="bottom">
                    <ActionIcon onClick={openCreate} variant="default" radius="xl" size="lg">
                        <IconPlus size={24} />
                    </ActionIcon>
                </Tooltip>
                
            </Group>
            
            <CustomGrid
                data={randomizerPropData}
                Component={RandomizerCardEdit}
            />

            <Modal opened={deleteConfirmOpened} onClose={closeDeleteConfirm} title={"Are you sure you want to delete?"} centered>
                <Group>
                    <Button onClick={closeDeleteConfirm} variant="default">No</Button>
                    <Button onClick={() => { handleDelete(selectedCardId); closeDeleteConfirm()}} variant="default">Yes</Button>
                </Group> 
            </Modal>

            <Modal opened={renameOpened} onClose={closeRename} title={"Enter a new name:"} centered>
                <form onSubmit={handleSubmitRename}>
                    <TextInput
                        ref={renameInputRef}
                        value={renameInput}
                        onChange={(event) => setRenameInput(event.currentTarget.value)}
                        data-autofocus
                    />
                    <Button type="submit" variant="default">Submit</Button>
                </form>
            </Modal>

            <CreateRandomizerModal
                opened={createOpened}
                close={closeCreate}
                handleSubmit={handleCreateSubmit}
            />
        </>
    )
}

export default Dashboard

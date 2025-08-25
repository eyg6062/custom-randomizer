import { useState, useEffect} from "react";
import { CreateRandomizerDto, RandomizerCardProps } from "../types/randomizer";
import { apiDeleteRandomizer, getRandomizersWithImageUrl} from "../api/randomizer";
import CustomGrid from "../components/CustomGrid";
import { RandomizerCardEdit } from "../components/RandomizerCard";
import { createRandomizer, editRandomizerImage, editRandomizerName } from "../Utils/randomizerEditor";
import { ActionIcon, Button, Group, Modal, Tooltip } from "@mantine/core";
import {IconPlus} from '@tabler/icons-react'
import { useDisclosure } from "@mantine/hooks";
import CreateRandomizerModal from "../components/CreateRandomizerModal";
import EditImageModal from "../components/EditImageModal";
import RenameModal from "../components/RenameModal";

function Dashboard () {
    const [randomizerData, setRandomizerData] = useState<RandomizerCardProps[]>([]);
    const [selectedCard, setSelectedCard] = useState<RandomizerCardProps>();

    // delete confirmation modal
    const [deleteConfirmOpened, { open: openDeleteConfirm, close: closeDeleteConfirm }] = useDisclosure(false);

    // edit modals
    const [editThumbOpened, { open: openEditThumb, close: closeEditThumb }] = useDisclosure(false);
    const [renameOpened, { open: openRename, close: closeRename }] = useDisclosure(false);
    const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false);



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
            if (response.imageKey && image) {
                imageUrl = URL.createObjectURL(image);
            }

            const newRand : RandomizerCardProps = {
                id: response.id,
                name: name,
                imageKey: response.imageKey,
                imageUrl: imageUrl,
            }
            setRandomizerData(prev => [...prev, newRand]);

        } catch (error) {
            console.error(`Failed to create randomizer:`, error);
        }

        closeCreate();
    }

    const handleDeleteClick = (rand: RandomizerCardProps) => {
        openDeleteConfirm();
        setSelectedCard(rand);
    }

    const handleDelete = async () => {
        if (!selectedCard) {
            console.log("no randomizer id selected");
            return;
        }
        try {
            await apiDeleteRandomizer(selectedCard.id);
            setRandomizerData(prev => prev.filter(randomizer => randomizer.id !== selectedCard.id));
        } catch (error) {
            console.error(`Failed to delete randomizer ${selectedCard.id}:`, error);
        }
    }

    const handleRenameClick = (rand: RandomizerCardProps) => {
        setSelectedCard(rand);
        openRename();
    }

    const handleSubmitRename = async (event: React.FormEvent<HTMLFormElement>, renameInput: string) => {
        event.preventDefault();
        
        if (!selectedCard) {
            console.log("no randomizer id selected");
            return;
        }

        try {
            await editRandomizerName(selectedCard.id, renameInput);
            setRandomizerData(prev => 
                prev.map(randomizer => {
                    if (randomizer.id === selectedCard.id) {
                        console.log("editing name");
                        return {...randomizer, name: renameInput};
                    }
                    else {
                        return randomizer;
                    }
                })
            );

        } catch (error) {
            console.error(`Failed to rename randomizer ${selectedCard.id}:`, error);
        }

        closeRename();
    }

    const handleEditThumbClick = (rand: RandomizerCardProps) => {
        openEditThumb();
        setSelectedCard(rand);
    }

    const handleSubmitEditThumb = async (event: React.FormEvent<HTMLFormElement>, image: File | undefined) => {
        event.preventDefault();

        if (!selectedCard) {
            console.log("no randomizer selected");
            return;
        }
        
        try {
            const putResponse = await editRandomizerImage(selectedCard.id, image as File);
            
            let imageUrl: string;
            if (putResponse.imageKey && image) {
                imageUrl = URL.createObjectURL(image);
            }

            setRandomizerData(prev => 
                prev.map(randomizer => {
                    if (randomizer.id === putResponse.id) {
                        console.log("editing image key");
                        return {...randomizer, imageKey: putResponse.imageKey, imageUrl: imageUrl};
                    }
                    else {
                        return randomizer;
                    }
                })
            );

        } catch (error) {
            console.error(`Failed to edit randomizer thumbnail ${selectedCard.id}:`, error);
        }

        closeEditThumb();

    }

    useEffect( () => {
        getRandomizersWithImageUrl()
            .then(json => setRandomizerData(json))
    }, [] );

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
                data={randomizerData.map(randomizer => ({
                    ...randomizer,
                    onRenameClick: handleRenameClick,
                    onDeleteClick: handleDeleteClick,
                    onEditThumbClick: handleEditThumbClick,
                }))}
                Component={RandomizerCardEdit}
            />

            <Modal opened={deleteConfirmOpened} onClose={closeDeleteConfirm} title={"Are you sure you want to delete?"} centered>
                <Group>
                    <Button onClick={closeDeleteConfirm} variant="default">No</Button>
                    <Button onClick={() => { handleDelete(); closeDeleteConfirm()}} variant="default">Yes</Button>
                </Group> 
            </Modal>

            <RenameModal
                randProps={selectedCard}
                opened={renameOpened}
                close={closeRename}
                handleSubmit={handleSubmitRename}
            />

            <EditImageModal
                opened={editThumbOpened}
                close={closeEditThumb}
                handleSubmit={handleSubmitEditThumb}
            />

            <CreateRandomizerModal
                opened={createOpened}
                close={closeCreate}
                handleSubmit={handleCreateSubmit}
            />
        </>
    )
}

export default Dashboard

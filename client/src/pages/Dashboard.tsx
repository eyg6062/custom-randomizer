import { useState, useEffect } from "react";
import { Randomizer, RandomizerCardEditProps } from "../types/randomizer";
import { getRandomizers, apiDeleteRandomizer } from "../api/randomizer";
import CustomGrid from "../components/CustomGrid";
import { RandomizerCardEdit } from "../components/RandomizerCard";
import { editRandomizerName } from "../Utils/randomizerEditor";
import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function Dashboard () {
    const [randomizerData, setRandomizerData] = useState<Randomizer[]>([]);
    const [randomizerPropData, setRandomizerPropData] = useState<RandomizerCardEditProps[]>([]);
    const [selectedCardId, setSelectedCardId] = useState<string>();

    // delete confirmation modal
    const [deleteConfirmOpened, { open: openDeleteConfirm, close: closeDeleteConfirm }] = useDisclosure(false);

    // edit modals
    const [editThumbOpened, { open: openEditThumb, close: closeEditThumb }] = useDisclosure(false);
    const [renameOpened, { open: openRename, close: closeRename }] = useDisclosure(false);

    // rename input value
    const [renameInput, setRenameInput] = useState('');

    

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

    const handleRenameClick = (id: string) => {
        setRenameInput("");
        openRename();
        setSelectedCardId(id);
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
        getRandomizers()
            .then(json => setRandomizerData(json))
    }, [] );

    useEffect(() => {
        const mappedRandProps: RandomizerCardEditProps[] = randomizerData.map(randomizer => ({
            id: randomizer.id,
            name: randomizer.name,
            imageUrl: randomizer.imageUrl,
            onRenameClick: handleRenameClick,
            onDeleteClick: handleDeleteClick,
            onEditThumbClick: handleEditThumbClick
        }));
        setRandomizerPropData(mappedRandProps)
    }, [randomizerData] );

    return (
        <>
            <h1>Dashboard</h1>

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
                    placeholder="Edit name"
                    value={renameInput}
                    onChange={(event) => setRenameInput(event.currentTarget.value)}
                    />
                    <Button type="submit" variant="default">Submit</Button>
                </form>
            </Modal>
        </>
    )
}

export default Dashboard

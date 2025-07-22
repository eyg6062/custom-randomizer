import { useState, useEffect } from "react";
import { Randomizer, RandomizerCardEditProps } from "../types/randomizer";
import { getRandomizers, apiDeleteRandomizer } from "../api/randomizer";
import CustomGrid from "../components/CustomGrid";
import { RandomizerCardEdit } from "../components/RandomizerCard";
import { editRandomizerName } from "../Utils/randomizerEditor";
import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

function Dashboard () {
    const [randomizerData, setRandomizerData] = useState<Randomizer[]>([]);
    const [randomizerPropData, setRandomizerPropData] = useState<RandomizerCardEditProps[]>([]);

    // delete confirmation modal
    const [deleteConfirmOpened, { open: openDeleteConfirm, close: closeDeleteConfirm }] = useDisclosure(false);
    const [selectedRandId, setSelectedRandId] = useState<string>();

    const handleDeleteClick = (id: string) => {
        openDeleteConfirm();
        setSelectedRandId(id);
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

    const handleEdit = () => {
        //
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
                onDeleteClick: handleDeleteClick,
                onEditClick: handleEdit
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
                    <Button onClick={() => { handleDelete(selectedRandId); closeDeleteConfirm()}} variant="default">Yes</Button>
                </Group> 
            </Modal>
        </>
    )
}

export default Dashboard

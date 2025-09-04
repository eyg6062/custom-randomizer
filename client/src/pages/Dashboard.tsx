import { useState, useEffect} from "react";
import { CreateRandomizerDto, RandomizerCardProps } from "../types/randomizer";
import { apiDeleteRandomizer, getRandomizersWithImageUrl} from "../api/randomizer";
import CustomGrid from "../components/CustomGrid";
import { RandomizerCardEdit } from "../components/RandomizerCard";
import { createRandomizer, editRandomizerImage, editRandomizerName } from "../Utils/randomizerEditor";
import { Group } from "@mantine/core";
import CreateRandomizerModal, {CreateRandomizerProps} from "../components/CreateRandomizerModal";
import EditImageModal, { EditImageProps } from "../components/EditImageModal";
import { useCustomModal } from "../hooks/useCustomModal";
import RenameModal, { RenameModalProps } from "../components/RenameModal";
import DeleteConfirmModal, { DeleteConfirmProps } from "../components/DeleteConfirmModal";
import CreateItemButton from "../components/CreateItemButton";

function Dashboard () {
    const [randomizerData, setRandomizerData] = useState<RandomizerCardProps[]>([]);

    useEffect( () => {
        getRandomizersWithImageUrl()
            .then(json => setRandomizerData(json))
    }, [] );


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

        createModal.close();
    }

    const handleDelete = async () => {
        const selectedCard = deleteConfirmModal.data;
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

    const handleSubmitRename = async (event: React.FormEvent<HTMLFormElement>, renameInput: string) => {
        event.preventDefault();
        const selectedCard = renameModal.data as RandomizerCardProps;

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

        renameModal.close();
    }

    const handleSubmitEditThumb = async (event: React.FormEvent<HTMLFormElement>, image: File | undefined) => {
        event.preventDefault();

        const selectedCard = editThumbModal.data;

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

        editThumbModal.close()
    }

    
    // modals
    const createModal = useCustomModal<undefined, CreateRandomizerProps>(
        CreateRandomizerModal, 
        {handleSubmit: handleCreateSubmit}
    );

    const renameModal = useCustomModal<RandomizerCardProps, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitRename}
    );

    const editThumbModal = useCustomModal<RandomizerCardProps, EditImageProps>(
        EditImageModal,
        {handleSubmit: handleSubmitEditThumb}
    );

    const deleteConfirmModal = useCustomModal<RandomizerCardProps, DeleteConfirmProps>(
        DeleteConfirmModal,
        {handleSubmit: handleDelete}
    )


    return (
        <>
            <Group>
                <h1>Dashboard</h1>

                <CreateItemButton
                    onClick={createModal.open}
                    toolTipLabel="Create new randomizer"
                />
                
            </Group>
            
            <CustomGrid
                data={randomizerData.map(randomizer => ({
                    ...randomizer,
                    onRenameClick: renameModal.openWithData,
                    onDeleteClick: deleteConfirmModal.openWithData,
                    onEditThumbClick: editThumbModal.openWithData,
                }))}
                Component={RandomizerCardEdit}
            />

            {deleteConfirmModal.modalNode}

            {renameModal.modalNode}

            {editThumbModal.modalNode}

            {createModal.modalNode}

        </>
    )
}

export default Dashboard

import { Button, Group } from "@mantine/core";
import CustomGrid from "../components/CustomGrid";
import { TraitCardEdit } from "../components/TraitCard";
import { AnyTrait, CreateAnyTraitDto, EditTraitDto } from "../types/trait";
import { IconPencil } from "@tabler/icons-react";
import CircleButton from "../components/CircleButton";
import { useCustomModal } from "../hooks/useCustomModal";
import RenameModal, { RenameModalProps } from "../components/modals/RenameModal";
import CreateTraitModal, { CreateTraitProps } from "../components/modals/CreateTraitModal";
import DeleteConfirmModal, { DeleteConfirmProps } from "../components/modals/DeleteConfirmModal";
import { RandomizerCardProps } from "../types/randomizer";
import { deleteTrait, postTrait, putTrait } from "../api/trait";
import EditDescModal, { EditDescModalProps } from "../components/modals/EditDescModal";
import CreateItemButton from "../components/CreateItemButton";
import { ItemType } from "../types/modalProps";
import { useRandomizerEditPage } from "../hooks/useRandomizerEditPage";
import { useRandomizerPageData } from "../hooks/useRandomizerPageData";

function RandomizerEditPage () {
    const {
        traitData,
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards,
        setTraitData,
    } = useRandomizerPageData();
    
    const {
        randomizerData,
        handleSubmitRandRename,
        handleSubmitEditDesc,
    } = useRandomizerEditPage();


    const handleSubmitCreate = async (e: React.FormEvent<HTMLFormElement>, data: CreateAnyTraitDto) => {
        e.preventDefault();
        console.log(data)

        if (!randomizerData) {
            console.log("no randomizer id selected");
            return;
        }

        try {
            const response = await postTrait(randomizerData?.id, data);

            setTraitData(prev => [...prev, response]);

        } catch (error) {
            console.error(`Failed to create new trait:`, error);
        }

        createModal.close();
        return;
    }

    const handleSubmitTraitRename = async (item: ItemType, renameInput: string) => {        
        const selectedTrait = item as AnyTrait;

        try {
            const data: EditTraitDto = {traitType: selectedTrait.traitType, name: renameInput}
            await putTrait(selectedTrait.id, data);

            setTraitData(prev => 
                prev.map(trait => {
                    if (trait.id === selectedTrait.id) {
                        console.log("editing name");
                        return {...trait, name: renameInput};
                    }
                    else {
                        return trait;
                    }
                })
            );

        } catch (error) {
            console.error(`Failed to rename trait:`, error);
        }

        renameTraitModal.close()
        return;
    }

    const handleDelete = async (_: ItemType) => {
        const selectedTrait = deleteConfirmModal.data;
        if (!selectedTrait) {
            console.log("no trait id selected");
            return;
        }

        try {
            await deleteTrait(selectedTrait.id);
            setTraitData(prev => prev.filter(trait => trait.id !== selectedTrait.id));

        } catch (error) {
            console.error(`Failed to delete trait:`, error);
        }
        return;
    }


    const renameRandModal = useCustomModal<RandomizerCardProps, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitRandRename}
    )

    const editDescModal = useCustomModal<RandomizerCardProps, EditDescModalProps>(
        EditDescModal,
        {handleSubmit: handleSubmitEditDesc}
    )

    const createModal =  useCustomModal<undefined, CreateTraitProps>(
        CreateTraitModal,
        {handleSubmit: handleSubmitCreate}
    )

    const renameTraitModal = useCustomModal<AnyTrait, RenameModalProps>(
        RenameModal,
        {handleSubmit: handleSubmitTraitRename}
    )

    const deleteConfirmModal = useCustomModal<AnyTrait, DeleteConfirmProps>(
        DeleteConfirmModal,
        {handleSubmit: handleDelete}
    )


    if (!randomizerData || !traitData ) return null;

    return (
        <>
            <p>(edit view)</p>
            <Group>
                <CircleButton
                    icon={IconPencil}
                    onClick={() => renameRandModal.openWithData(randomizerData)}
                />
                <h1>{randomizerData.name}</h1>
            </Group>

            <Group>
                <CircleButton
                    icon={IconPencil}
                    onClick={() => editDescModal.openWithData(randomizerData)}
                />
                <p>{randomizerData.description || "(description)"}</p>
            </Group>
            
            <CreateItemButton
                onClick={createModal.open}
                toolTipLabel="Create new trait"
            />
            
            <CustomGrid 
                data={traitData.map(trait => ({
                    ...trait,
                    onCardClick: handleUpdateTraitCard,
                    onRenameClick: renameTraitModal.openWithData,
                    onDeleteClick: deleteConfirmModal.openWithData,
                }))}
                Component={TraitCardEdit}
            />

            <Group justify="center">
                <Button onClick={randomizeAllCards} variant="default">
                    Randomize All
                </Button>

                <Button onClick={clearAllCards} variant="default">
                    Clear All
                </Button>
            </Group>

            {renameRandModal.modalNode}
            {editDescModal.modalNode}
            {createModal.modalNode}
            {renameTraitModal.modalNode}
            {deleteConfirmModal.modalNode}

        </>
    )
}

export default RandomizerEditPage

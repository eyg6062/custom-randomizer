import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import CustomGrid from "../components/CustomGrid";
import { TraitCardEdit } from "../components/TraitCard";
import { useRandomizerPageData } from "../hooks/useRandomizerPageData";
import { AnyTrait, CreateAnyTraitDto, EditTraitDto } from "../types/trait";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import CircleButton from "../components/CircleButton";
import { editRandomizerName } from "../Utils/randomizerEditor";
import { useCustomModal } from "../hooks/useCustomModal";
import RenameModal, { RenameModalProps } from "../components/RenameModal";
import CreateTraitModal, { CreateTraitProps } from "../components/CreateTraitModal";
import DeleteConfirmModal, { DeleteConfirmProps } from "../components/DeleteConfirmModal";
import { RandomizerCardProps } from "../types/randomizer";
import { deleteTrait, postTrait, putTrait } from "../api/trait";

function RandomizerEditPage () {
    const {
        randomizerData,
        setRandomizerData,
        traitData,
        setTraitData,
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards
    } = useRandomizerPageData();


    const handleSubmitRandRename = async (event: React.FormEvent<HTMLFormElement>, renameInput: string) => {
        event.preventDefault();

        if (!randomizerData) {
            console.log("no randomizer id selected");
            return;
        }

        try {
            await editRandomizerName(randomizerData.id, renameInput);
            setRandomizerData({...randomizerData, name: renameInput});

        } catch (error) {
            console.error(`Failed to rename randomizer ${randomizerData.id}:`, error);
        }

        renameRandModal.close();
    }

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

    const handleSubmitTraitRename = async (e: React.FormEvent<HTMLFormElement>, renameInput: string) => {
        e.preventDefault();
        
        const selectedTrait = renameTraitModal.data;
        if (!selectedTrait) {
            console.log("no trait id selected");
            return;
        }

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

    const handleDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        
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


    if (!randomizerData || !traitData ) {
        return null;
    }

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
            

            <Tooltip label="Create new trait" openDelay={500} withArrow arrowSize={8} position="bottom">
                <ActionIcon onClick={createModal.open} variant="default" radius="xl" size="lg">
                    <IconPlus size={24} />
                </ActionIcon>
            </Tooltip>
            
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

            {createModal.modalNode}

            {renameTraitModal.modalNode}

            {deleteConfirmModal.modalNode}

        </>
    )
}

export default RandomizerEditPage

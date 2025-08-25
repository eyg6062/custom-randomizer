import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import CustomGrid from "../components/CustomGrid";
import { TraitCardEdit } from "../components/TraitCard";
import { useRandomizerPageData } from "../hooks/useRandomizerPageData";
import { useModal } from "../hooks/useModal";
import { AnyTrait } from "../types/trait";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import CircleButton from "../components/CircleButton";
import { useRenameModal } from "../hooks/useRenameModal";
import { RandomizerCardProps } from "../types/randomizer";
import { editRandomizerName } from "../Utils/randomizerEditor";

function RandomizerEditPage () {
    const {
        randomizerData,
        setRandomizerData,
        traitData,
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards
    } = useRandomizerPageData();

    // modals
    const renameRandModal = useRenameModal<RandomizerCardProps>();

    const createModal = useModal();
    const renameTraitModal = useRenameModal<AnyTrait>();
    const deleteConfirmModal = useModal<AnyTrait>();


    const handleSubmitRename = async (event: React.FormEvent<HTMLFormElement>, renameInput: string) => {
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



    if (!randomizerData || !traitData ) {
        return null;
    }

    return (
        <>
            <p>(edit view)</p>
            <Group>
                <CircleButton
                    icon={IconPencil}
                    onClick={renameRandModal.open}
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
                    onRenameClick: renameTraitModal.open,
                    onDeleteClick: deleteConfirmModal.open,
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

            {renameRandModal.modalNode(handleSubmitRename)}

        </>
    )
}

export default RandomizerEditPage

import { ActionIcon, Button, Group, Tooltip } from "@mantine/core";
import CustomGrid from "../components/CustomGrid";
import { TraitCardEdit } from "../components/TraitCard";
import { useRandomizerPageData } from "../hooks/useRandomizerPageData";
import { useModal } from "../hooks/useModal";
import { AnyTrait } from "../types/trait";
import { IconPencil, IconPlus } from "@tabler/icons-react";
import CircleButton from "../components/CircleButton";

function RandomizerEditPage () {
    const {
        randomizerData,
        traitData,
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards
    } = useRandomizerPageData();

    // modals
    const renameRandModal = useModal();

    const createModal = useModal();
    const renameTraitModal = useModal<AnyTrait>();
    const deleteConfirmModal = useModal<AnyTrait>();


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

        </>
    )
}

export default RandomizerEditPage

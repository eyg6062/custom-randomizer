import { Button, Group } from "@mantine/core";
import CustomGrid from "../components/CustomGrid";
import { TraitCardEdit } from "../components/TraitCard";
import { useRandomizerPageData } from "../hooks/useRandomizerPageData";

function RandomizerEditPage () {
    const {
        randomizerData,
        traitData,
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards
    } = useRandomizerPageData();

    const handleRenameClick = () => {
        console.log("rename click")
    }

    const handleDeleteClick = () => {
        console.log("delete click")
    }

    if (!randomizerData || !traitData ) {
        return null;
    }

    return (
        <>
            <h1>{randomizerData.name} (edit view)</h1>
            
            <CustomGrid 
                data={traitData.map(trait => ({
                    ...trait,
                    onCardClick: handleUpdateTraitCard,
                    onRenameClick: handleRenameClick,
                    onDeleteClick: handleDeleteClick,
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

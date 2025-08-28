import CustomGrid from "../components/CustomGrid";
import { TraitCardPublic } from "../components/TraitCard";
import { Button, Group, Text } from "@mantine/core";
import { useRandomizerPageData } from "../hooks/useRandomizerPageData";


function RandomizerPage () {
    const {
        randomizerData,
        traitData,
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards,
    } = useRandomizerPageData();

    if (!randomizerData || !traitData ) {
        return null;
    }

    return (
        <>
            <h1>{randomizerData.name}</h1>

            <Text>
                {randomizerData.description}
            </Text>

            <CustomGrid 
                data={traitData}
                Component={(props) => (
                    <TraitCardPublic
                        {...props}
                        onCardClick={handleUpdateTraitCard}
                    />
                )}
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

export default RandomizerPage

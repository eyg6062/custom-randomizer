import CustomGrid from "../components/CustomGrid";
import { TraitCardPublic } from "../components/TraitCard";
import { Button, Group, Text } from "@mantine/core";
import { useTraitRandomizer } from "../hooks/useRandomizerPageTraitData";
import { useSingleRandomizerData } from "../hooks/useSingleRandomizerData";
import { useParams } from "react-router";


function RandomizerPage () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) throw new Error("Missing route parameter: id");

    const {randomizerData} = useSingleRandomizerData(id);

    const {
        traitData,
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards,
    } = useTraitRandomizer();

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

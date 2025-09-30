import CustomGrid from "../components/CustomGrid";
import { TraitCardPublic } from "../components/TraitCard";
import { Button, Group, Text } from "@mantine/core";
import { useTraitRandomizer } from "../hooks/useTraitRandomizer";
import { useSingleRandomizerData } from "../hooks/data/useSingleRandomizerData";
import { useParams } from "react-router";
import { useTraitData } from "../hooks/data/useTraitData";

function RandomizerPage () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) throw new Error("Missing route parameter: id");

    const {randomizerData} = useSingleRandomizerData(id);
    const {traitData} = useTraitData(id);

    const {
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

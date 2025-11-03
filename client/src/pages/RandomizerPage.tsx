import CustomGrid from "../components/CustomGrid";
import { TraitCardPublic } from "../components/TraitCard";
import { Button, Group, Text } from "@mantine/core";
import { useTraitRandomizer } from "../hooks/useTraitRandomizer";
import { useSingleRandomizerData } from "../hooks/data/useSingleRandomizerData";
import { useParams } from "react-router";
import { useTraitData } from "../hooks/data/useTraitData";
import { LoadingIndicator } from "../components/LoadingIndicator";

function RandomizerSection ({id}: {id: string}) {
    const {isFetching, randomizerData} = useSingleRandomizerData(id);
    
    if (!randomizerData) return <LoadingIndicator/>;
    const pageContent = (
        <>
            <h1>{randomizerData.name}</h1>

            <Text>
                {randomizerData.description}
            </Text>
        </>
    )

    return isFetching ? <LoadingIndicator/> : pageContent;
}

function TraitsSection ({id}: {id: string}) {
    const {isFetching, traitData} = useTraitData(id);
    const {
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards,
    } = useTraitRandomizer();
    
    if (!traitData) return <LoadingIndicator/>;
    const pageContent = (
        <>
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

    return isFetching ? <LoadingIndicator/> : pageContent;
}

function RandomizerPage () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) throw new Error("Missing route parameter: id");

    return (
        <>
            <RandomizerSection id={id}/>
            <div className="h-6" />
            <TraitsSection id={id}/>
        </>
    )
}

export default RandomizerPage

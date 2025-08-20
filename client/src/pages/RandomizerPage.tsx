import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Trait } from "../types/trait";
import { getTraitsByRandomizer } from "../api/trait";
import CustomGrid from "../components/CustomGrid";
import { TraitCard } from "../components/TraitCard";
import { Randomizer } from "../types/randomizer";
import { getRandomizer } from "../api/randomizer";
import { TraitCardProps } from "../types/trait";
import { randomizeTrait } from "../Utils/traitRandomizer";
import { Button, Group, Text } from "@mantine/core";
//import { Button } from "@mantine/core";


function RandomizerPage () {
    const {id} = useParams<{ id: string }>();

    const [randomizerData, setRandomizerData] = useState<Randomizer>();
    const [traitsData, setTraitData] = useState<Trait[]>([]);
    const [traitPropData, setTraitPropData] = useState<TraitCardProps[]>([]);

    if (id === undefined) {
        throw new Error("Missing route parameter: id");
    }
    
    useEffect( () => {
        getRandomizer(id)
            .then(json => setRandomizerData(json))
    }, [] );

    
    useEffect( () => {
        getTraitsByRandomizer(id)
            .then(json => setTraitData(json))
    }, [] );
    

    // randomizes trait card on click 
    const handleUpdateTraitCard = async (traitId: number) => {
        const traitData = traitsData.find(trait => trait.id === traitId);
        const propData = traitPropData.find(trait => trait.id === traitId);

        if (!traitData || !propData) {
            console.log("invalid trait id");
            return;
        }

        const updatedTrait = await randomizeTrait(traitData, propData);

        setTraitPropData(prev =>
            prev.map(trait =>
                trait.id === traitId ? updatedTrait : trait
            )
        );

    }

    useEffect(() => {
        const mappedTraitProps: TraitCardProps[] = traitsData.map(trait => ({
            id: trait.id,
            name: trait.name,
            traitType: trait.traitType,
            value: undefined,
            imageUrl: undefined,
            //onCardClick: handleUpdateTraitCard
        }));
        setTraitPropData(mappedTraitProps)
    }, [traitsData] );

    // Clears all trait cards
    const clearAllCards = () => {
        setTraitPropData(prev =>
            prev.map(trait => {
                return {...trait, imageUrl: undefined, value: undefined}
            })
        )
    }

    // randomizes all trait cards
    const randomizeAllCards = async () => {
        const updatedTraits = await Promise.all(
            traitPropData.map(async (traitPropData) => {
                const traitData = traitsData.find(trait => trait.id === traitPropData.id);
                if (!traitData) {
                    console.log("invalid trait id");
                    return traitPropData;
                }
                return await randomizeTrait(traitData, traitPropData);
            })
        );

        setTraitPropData(updatedTraits);
    }

    if (!randomizerData || !traitsData ) {
        return null;
    }

    return (
        <>
            <h1>{randomizerData.name} {`(id: ${id})`}</h1>

            <Text>
                {randomizerData.description}
            </Text>

            <CustomGrid 
                data={traitPropData}
                Component={(props) => (
                    <TraitCard
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

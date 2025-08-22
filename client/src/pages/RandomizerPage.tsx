import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { AnyTrait } from "../types/trait";
import { getTraitsByRandomizer } from "../api/trait";
import CustomGrid from "../components/CustomGrid";
import { TraitCardPublic } from "../components/TraitCard";
import { Randomizer } from "../types/randomizer";
import { getRandomizer } from "../api/randomizer";
import { TraitCardProps } from "../types/trait";
import { randomizeTrait } from "../Utils/traitRandomizer";
import { Button, Group, Text } from "@mantine/core";


function RandomizerPage () {
    const {id} = useParams<{ id: string }>();

    const [randomizerData, setRandomizerData] = useState<Randomizer>();
    const [traitData, setTraitData] = useState<TraitCardProps[]>([]);

    if (id === undefined) {
        throw new Error("Missing route parameter: id");
    }
    
    useEffect( () => {
        getRandomizer(id)
            .then(json => setRandomizerData(json))
    }, [] );

    
    useEffect( () => {
        const setTraits = async () => {
            const traits: AnyTrait[] = await getTraitsByRandomizer(id);
            const traitsProps = traits.map((trait: TraitCardProps) => ({
                ...trait,
                imageUrl: undefined,
                value: undefined
            }))
            setTraitData(traitsProps);
        };

        setTraits();
        
    }, [] );
    

    // randomizes trait card on click 
    const handleUpdateTraitCard = async (traitId: string) => {
        const selectedTrait = traitData.find(trait => trait.id === traitId);

        const updatedTrait: TraitCardProps = await randomizeTrait(selectedTrait as AnyTrait);

        setTraitData(prev =>
            prev.map(trait =>
                trait.id === traitId ? updatedTrait : trait
            )
        );

    }


    // Clears all trait cards
    const clearAllCards = () => {
        setTraitData(prev =>
            prev.map(trait => {
                return {...trait, imageUrl: undefined, value: undefined}
            })
        )
    }

    // randomizes all trait cards
    const randomizeAllCards = async () => {
        const updatedTraits = await Promise.all(
            traitData.map(async (trait) => {
                return await randomizeTrait(trait);
            })
        );

        setTraitData(updatedTraits);
    }

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

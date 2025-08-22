import { useState, useEffect } from "react"
import { getRandomizer } from "../api/randomizer";
import { Randomizer } from "../types/randomizer";
import { useParams } from "react-router";
import { AnyTrait, TraitCardProps } from "../types/trait";
import { getTraitsByRandomizer } from "../api/trait";
import { randomizeTrait } from "../Utils/traitRandomizer";
import { Button, Group } from "@mantine/core";
import CustomGrid from "../components/CustomGrid";
import { TraitCardEdit } from "../components/TraitCard";

function RandomizerEditPage () {
    const {id} = useParams<{ id: string }>();
    if (id === undefined) {
        throw new Error("Missing route parameter: id");
    }

    const [randomizerData, setRandomizerData] = useState<Randomizer>();
    const [traitData, setTraitData] = useState<AnyTrait[]>([]);

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

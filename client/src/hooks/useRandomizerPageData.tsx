import { getRandomizer } from "../api/randomizer";
import { getTraitsByRandomizer } from "../api/trait";
import { Randomizer } from "../types/randomizer";
import { AnyTrait, TraitCardProps } from "../types/trait";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { randomizeTrait } from "../Utils/traitRandomizer";

export function useRandomizerPageData () {
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
    const handleUpdateTraitCard = async (selectedTrait: AnyTrait) => {

        const updatedTrait: TraitCardProps = await randomizeTrait(selectedTrait as AnyTrait);

        setTraitData(prev =>
            prev.map(trait =>
                trait.id === selectedTrait.id ? updatedTrait : trait
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

    return {
        randomizerData,
        traitData,
        handleUpdateTraitCard,
        clearAllCards,
        randomizeAllCards,
        setRandomizerData,
        setTraitData
    };

}
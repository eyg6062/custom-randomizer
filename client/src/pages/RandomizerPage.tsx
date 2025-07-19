import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Trait } from "../types/trait";
import { getTraitsByRandomizer } from "../api/trait";
import CustomGrid from "../components/CustomGrid";
import { TraitCard } from "../components/TraitCard";
import { Randomizer } from "../types/randomizer";
import { getRandomizer } from "../api/randomizer";
import { TraitCardProps } from "../types/traitCardProps";
import { randomizeTrait } from "../Utils/traitRandomizer";
import { Button } from "@mantine/core";
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
    const handleUpdateTraitCard = (traitId: number) => {
        const traitData = traitsData.find(trait => trait.id === traitId);
        if (!traitData) {
            console.log("invalid trait id");
            return;
        }

        setTraitPropData(prev =>
            prev.map(trait => {
                if (trait.id === traitId) {
                    console.log(`Editing trait ${trait.id}`);
                    return randomizeTrait(traitData, trait);

                } else {
                    return trait;
                }
            })
        )
        console.log(traitPropData);
    }

    useEffect(() => {
        const mappedTraitProps: TraitCardProps[] = traitsData.map(trait => ({
            id: trait.id,
            name: trait.name,
            traitType: trait.traitType,
            onCardClick: handleUpdateTraitCard
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
    const randomizeAllCards = () => {
        setTraitPropData(prev =>
            prev.map(traitPropData => {
                // todo: not efficient, find a better way to to this later
                const traitData = traitsData.find(trait => trait.id === traitPropData.id);
                if (!traitData) {
                    console.log("invalid trait id");
                    return traitPropData;
                }
                return randomizeTrait(traitData, traitPropData)
            })
        )
    }
    
    if (!randomizerData || !traitsData) {
        return null;
    }

    return (
        <>
            <h1>{randomizerData.name} {`(id: ${id})`}</h1>

            <div>
                <p>{randomizerData.description}</p>
            </div>

            <CustomGrid 
                data={traitPropData}
                Component={TraitCard}
            />

            <Button onClick={clearAllCards}>
                Clear All
            </Button>
            
            <Button onClick={randomizeAllCards}>
                Randomize All
            </Button>
        </>
    )
}

export default RandomizerPage

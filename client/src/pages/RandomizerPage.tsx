import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { BasicTrait, NumberTrait, Trait } from "../types/trait";
import { getTraitsByRandomizer } from "../api/trait";
import CustomGrid from "../components/CustomGrid";
import { TraitCard } from "../components/TraitCard";
import { Randomizer } from "../types/randomizer";
import { getRandomizer } from "../api/randomizer";
import { TraitCardProps } from "../types/traitCardProps";
import { TraitType } from "../types/traitType";
import { randomizeBasicTrait, randomizeNumberTrait } from "../Utils/traitRandomizer";
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
    

    const handleUpdateTraitCard = (traitId: number) => {
        const traitData = traitsData.find(trait => trait.id === traitId);

        setTraitPropData(prev =>
            prev.map(trait => {
                if (trait.id === traitId) {
                    console.log(`Editing trait ${trait.id}`);
                    switch (trait.traitType) {
                        case TraitType.Basic:
                            const traitOption = randomizeBasicTrait(traitData as BasicTrait);
                            return {...trait, imageUrl: traitOption.imageUrl, value: traitOption.text};
                        case TraitType.Number:
                            const numVal = randomizeNumberTrait(traitData as NumberTrait);
                            return {...trait, value: String(numVal)};
                        case TraitType.Color:
                            // todo: add color in
                            return {...trait};
                        default:
                    }

                    console.log("no trait type match");
                    return {...trait};
            } else {
                console.log(`Skipping trait ${trait.id}`);
                return trait;
            }
        }
            //    trait.id === traitId ? {...trait, value: "new value"} : trait
            )
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


    

    //console.log(traitPropData);
    
    if (!randomizerData) {
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
            
        </>
    )
}

export default RandomizerPage

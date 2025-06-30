import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Trait } from "../types/trait";
import { getTraitsByRandomizer } from "../api/trait";
import CustomGrid from "../components/CustomGrid";
import { TraitCard } from "../components/TraitCard";
import { Randomizer } from "../types/randomizer";
import { getRandomizer } from "../api/randomizer";

function RandomizerPage () {
    const {id} = useParams<{ id: string }>();

    const [randomizerData, setRandomizerData] = useState<Randomizer>();
    const [data, setData] = useState<Trait[]>([]);

    if (id === undefined) {
        throw new Error("Missing route parameter: id");
    }
    
    useEffect( () => {
        getRandomizer(id)
            .then(json => setRandomizerData(json))
    }, [id] );

    
    useEffect( () => {
        getTraitsByRandomizer(id)
            .then(json => setData(json))
    }, [id] );
    
    if (randomizerData === undefined) {
        return
    }

    return (
        <>
            <h1>Randomizer id:{id}</h1>

            <div>
                <p>{randomizerData.description}</p>
            </div>

            <CustomGrid 
                data={data}
                Component={TraitCard}
            />
            
        </>
    )
}

export default RandomizerPage

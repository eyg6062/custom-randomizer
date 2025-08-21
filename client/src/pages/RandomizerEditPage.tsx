import { useState, useEffect } from "react"
import { getRandomizer } from "../api/randomizer";
import { Randomizer } from "../types/randomizer";
import { useParams } from "react-router";
import { AnyTrait } from "../types/trait";

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


    if (!randomizerData) {
        return null;
    }

    return (
        <>
            <h1>{randomizerData.name} (edit view)</h1>
            
        </>
    )
}

export default RandomizerEditPage

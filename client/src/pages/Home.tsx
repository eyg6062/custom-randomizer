import { useState, useEffect } from "react"
import { RandomizerCardPublic } from "../components/RandomizerCard"
import CustomGrid from "../components/CustomGrid"
import { getRandomizersWithImageUrl } from "../api/randomizer";
import { RandomizerCardProps} from "../types/randomizer";

function Home () {
    const [randomizerData, setRandomizerData] = useState<RandomizerCardProps[]>([]);

    useEffect( () => {
        getRandomizersWithImageUrl()
            .then(json => setRandomizerData(json))
    }, [] );

    return (
        <>
            <h1>Home</h1>

            <CustomGrid
                data={randomizerData}
                Component={RandomizerCardPublic}
            />
            
        </>
    )
}

export default Home

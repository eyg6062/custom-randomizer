import { useState, useEffect } from "react";
import { Randomizer } from "../types/randomizer";
import { getRandomizers } from "../api/randomizer";
import CustomGrid from "../components/CustomGrid";
import { RandomizerCardEdit } from "../components/RandomizerCard";

function Dashboard () {
    const [data, setData] = useState<Randomizer[]>([]);

    useEffect( () => {
        getRandomizers()
            .then(json => setData(json))
    }, [] );

    return (
        <>
            <h1>Dashboard</h1>

            <CustomGrid
                data={data}
                Component={RandomizerCardEdit}
            />
            
        </>
    )
}

export default Dashboard

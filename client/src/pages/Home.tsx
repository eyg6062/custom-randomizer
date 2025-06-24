import { useState, useEffect } from "react"
import { RandomizerCardPublic } from "../components/RandomizerCard"
import CustomGrid from "../components/CustomGrid"
import { getRandomizers } from "../api/randomizer";
import { Randomizer } from "../types/randomizer";

function Home () {
    const [data1, setData] = useState<Randomizer[]>([]);

    useEffect( () => {
        getRandomizers()
            .then(json => setData(json))
    }, [] );

    const data = [{title:"meep", imageUrl:"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}, {title: "beep"}]
    //const item1 = {title:"meep", imageUrl:"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}

    return (
        <>
            <h1>Home</h1>

            <CustomGrid
                data={data1}
                Component={RandomizerCardPublic}
            />
            
        </>
    )
}

export default Home

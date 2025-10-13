import { RandomizerCardPublic } from "../components/RandomizerCard"
import CustomGrid from "../components/CustomGrid"
import { useRandomizersData } from "../hooks/data/useRandomizersData";
import { LoadingIndicator } from "../components/LoadingIndicator";
import { RandomizerCardProps } from "../types/randomizer";

function Home () {
    const {isFetching, error, randomizerData} = useRandomizersData();

    const pageContent = 
        <CustomGrid
            data={randomizerData as RandomizerCardProps[]}
            Component={RandomizerCardPublic}
        />

    if (error) return <p>error loading home page</p>;
    return (
        <>
            <h1>Home</h1>
            { (isFetching) ? <LoadingIndicator /> : pageContent }
        </>
    )
}

export default Home

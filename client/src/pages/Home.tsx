import { RandomizerCardPublic } from "../components/RandomizerCard"
import CustomGrid from "../components/CustomGrid"
import { useRandomizersData } from "../hooks/useRandomizersData";
import { LoadingIndicator } from "../components/LoadingIndicator";

function Home () {
    const {isFetching, isLoading, error, randomizerData} = useRandomizersData();

    const pageContent = 
        <CustomGrid
            data={randomizerData}
            Component={RandomizerCardPublic}
        />

    if (error) return <p>error loading home page</p>;
    return (
        <>
            <h1>Home</h1>
            { (isFetching || isLoading) ? <LoadingIndicator /> : pageContent }
        </>
    )
}

export default Home

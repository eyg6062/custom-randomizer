import { useParams } from "react-router"

function RandomizerPage () {
    const {id} = useParams();

    return (
        <>
            <h1>Randomizer id:{id}</h1>
        </>
    )
}

export default RandomizerPage

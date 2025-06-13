import { RandomizerCardPublic } from "../components/RandomizerCard"
import CardGrid from "../components/CardGrid"

function Home () {
    const data = [{title:"meep", imageUrl:"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}, {title: "beep"}]

    return (
        <>
            <h1>Home</h1>

            <CardGrid
                data={data}
                Component={RandomizerCardPublic}
            />
            
        </>
    )
}

export default Home

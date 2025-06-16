import { RandomizerCardPublic } from "../components/RandomizerCard"
import CustomGrid from "../components/CustomGrid"

function Home () {
    const data = [{title:"meep", imageUrl:"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}, {title: "beep"}]
    const item1 = {title:"meep", imageUrl:"https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"}

    for (let i = 0; i < 1; i++) {
        data.push(item1)
    }

    return (
        <>
            <h1>Home</h1>

            <CustomGrid
                data={data}
                Component={RandomizerCardPublic}
            />
            
        </>
    )
}

export default Home
